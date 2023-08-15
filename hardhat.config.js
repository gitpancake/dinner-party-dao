require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("hardhat-gas-reporter");
require("dotenv").config();

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const DEPLOYER_PK = process.env.DEPLOYER_PK;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

console.log(`
        ----
        H A R D H A T\n
        INFURA_API_KEY: ${INFURA_API_KEY === undefined ? "UNSET" : "SET"}
        DEPLOYER_PK: ${DEPLOYER_PK === undefined ? "UNSET" : "SET"}
        ETHERSCAN_API_KEY: ${ETHERSCAN_API_KEY === undefined ? "UNSET" : "SET"}
        COINMARKETCAP_API_KEY: ${COINMARKETCAP_API_KEY === undefined ? "UNSET" : "SET"}
        ----
`);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [DEPLOYER_PK],
    },
    fuji: {
      url: `https://avalanche-fuji.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [DEPLOYER_PK],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [DEPLOYER_PK],
    },
  },
  gasReporter: {
    enabled: true,
    gasPrice: 100,
    currency: "EUR",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
};
