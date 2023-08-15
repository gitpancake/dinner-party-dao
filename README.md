# RandomChooser Smart Contract

## Description

`RandomChooser` is a simple solidity contract designed to randomise numbers and store the result on-chain. It uses the Fisher-Yates shuffle algorithm for randomisation.

Please note, this contract doesn't use any Verifiable Random Function (VRF). Hence, it's a naive implementation of randomisation and shouldn't be used for scenarios where the randomness needs to be unpredictable and tamper-proof.

## Setup and Deployment

This project uses the Hardhat development environment for compilation, testing, and deployment of the contract. It uses several environment variables for configuration, which are set in a `.env` file.

### Prerequisites

- Node.js and npm installed (Node.js version 14 or higher)
- An Infura account (for the API key)
- An Etherscan account (for the API key)
- A CoinMarketCap account (for the API key)
- A wallet with some test ETH (for the private key)

### Setup

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Run `npm install` to install all the dependencies.
4. Create a `.env` file in the root directory of your project.
5. Set the following environment variables in the `.env` file:

  ```bash
  INFURA_API_KEY=<Infura API key>
  DEPLOYER_PK=<wallet pk>
  ETHERSCAN_API_KEY=<Etherscan API key>
  COINMARKETCAP_API_KEY=<CoinMarketCap API key>
  ```

  Replace `<Your Infura API key>`, `<Your wallet's private key>`, `<Your Etherscan API key>`, and `<Your CoinMarketCap API key>` with your actual keys and private key.

### Deployment

This contract can be deployed to different networks including Goerli, Fuji, and Mainnet. To deploy the contract, run:

```bash
npx hardhat run scripts/deploy.js --network <network>
```

Replace `<network>` with either goerli, fuji, or mainnet depending on the network you want to deploy to.

After the contract is deployed, Hardhat will verify the contract on Etherscan and print the contract address in the console.

## Features

1. `randomiseSequence`: This function accepts a sequence of numbers, randomises them, and stores the result against a provided key.

2. `viewResults`: This function allows you to retrieve the randomised results stored against a given key.

## How to use

### randomiseSequence

Use this function to randomise a sequence of numbers.

#### Parameters - randomiseSequence

- `key`: A string value which acts as the identifier for each randomised sequence.
- `resultLimit`: A uint value representing the total number of results to produce.
- `array`: An array of numbers to randomise.

#### Requirements

- The length of the array must be at least equal to the `resultLimit`.
- The result for the key should not already exist.

### viewResults

Use this function to view the randomised results for a given key.

#### Parameters - viewResults

- `key`: The key for which you want to view the results.

## Event

- `RandomComplete`: This event is emitted when a randomisation process completes. It includes the sender's address and the randomised result.

## License

This project is licensed under the MIT License.

## Author

Henry [@gitpancake](https://github.com/gitpancake)
