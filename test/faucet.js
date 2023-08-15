const { expect } = require("chai");
const { parseEther, zeroAddress } = require("viem");

describe("EtherFaucet", function () {
  it("Should deploy the contract and set a balance", async function () {
    const EtherFaucet = await ethers.getContractFactory("EtherFaucet");

    const root = "0x94e36b1d05d97c3c197d8644bab2b81af8bd3b81961c7f4dd60acabc1d1e1f13";

    const faucet = await EtherFaucet.deploy(root);

    const contractAddress = await faucet.getAddress();

    const [owner] = await ethers.getSigners();

    expect(await faucet.owner()).to.equal(owner.address);

    await owner.sendTransaction({
      to: contractAddress,
      value: parseEther("1000"), // Sends exactly 1.0 ether
    });

    expect(await faucet.getAddress()).to.equal(contractAddress);
    expect(await faucet.balance()).to.equal("1000000000000000000000");

    const proof = "0xf7c151327ca22035527956655fa853a70809db355f7010441eef9043cb328114";

    const requestEtherTx = await faucet.requestEther([proof]);

    // wait until the transaction is mined
    await requestEtherTx.wait();

    expect(await faucet.balance()).to.equal("999000000000000000000");

    const newRoot = "0xfb5c8bbb58da751f6ff2fae4d5c625b55ceb3c001318c30897b2da132f1adf20";

    const updateTx = await faucet.updateRoot(newRoot);

    await updateTx.wait();

    expect(await faucet.merkleRoot()).to.equal(newRoot);
    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

/**
 * {
  proof: [
    '0xf7c151327ca22035527956655fa853a70809db355f7010441eef9043cb328114'
  ],
  root: '0x94e36b1d05d97c3c197d8644bab2b81af8bd3b81961c7f4dd60acabc1d1e1f13'
}
 */
