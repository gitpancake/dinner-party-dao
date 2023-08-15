# Ether Faucet with Merkle Proof Authentication

This project introduces an Ethereum-based smart contract called `EtherFaucet`, which dispenses ether to users. To ensure controlled distribution, the faucet uses a Merkle Tree mechanism, allowing only pre-approved addresses to claim ether.

## Features

- **Merkle Tree Authentication**: Only addresses that are part of an initial Merkle tree can request ether.
- **Cooldown Mechanism**: Users have to wait for a set cooldown time before requesting ether again.
- **Owner Controls**: The contract owner can set drip amount, cooldown time, and withdraw excess ether.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)

## Setup

1. **Installation**:

    ```bash
    npm install
    ```

2. **Compile Contracts**:

    ```bash
    npx hardhat compile
    ```

3. **Run Tests**:

    ```bash
    npx hardhat test
    ```

## Usage

1. **Generating the Merkle Tree**:

    Before deploying the contract, generate the Merkle Tree of approved addresses using a utility like `merkletreejs`. This will give you the Merkle Root to initialize the contract with.

2. **Deploying the Contract**:

    Deploy the contract with the obtained Merkle Root:

    ```javascript
    const EtherFaucet = await ethers.getContractFactory("EtherFaucet");
    const faucet = await EtherFaucet.deploy(merkleRoot);
    ```

3. **Requesting Ether**:

    Approved addresses can request ether by providing a Merkle Proof:

    ```javascript
    await faucet.requestEther(merkleProof);
    ```

## Notes

Ensure the faucet is periodically funded if it's expected to receive a high volume of requests. Always deploy and test on testnets before the mainnet to avoid any loss of funds.
