async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Contract = await ethers.getContractFactory("HappyHolidays");

  const deployedContract = await Contract.deploy();

  const address = await deployedContract.getAddress();

  console.log(`- - - -`);
  console.log(`https://sepolia.etherscan.io/address/${address}`);
  console.log(`-`);
  console.log(`npx hardhat verify --network sepolia ${address}`);
  console.log(`- - - -`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 *
 * 0x7412660e55ab199d7bc383bd18f76b955c3b5811d3e6a1a67f6094066e1e70b2
 */
