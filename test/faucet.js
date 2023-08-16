const { expect } = require("chai");
const { parseEther } = require("viem");

describe("EtherFaucet", function () {
  it("Should deploy the contract and set a balance", async function () {
    const EtherFaucet = await ethers.getContractFactory("EtherFaucet");

    const root = "0x94e36b1d05d97c3c197d8644bab2b81af8bd3b81961c7f4dd60acabc1d1e1f13";

    const faucet = await EtherFaucet.deploy(root);

    const contractAddress = await faucet.getAddress();

    const [owner, addr1] = await ethers.getSigners();

    expect(await faucet.owner()).to.equal(owner.address);

    await owner.sendTransaction({
      to: contractAddress,
      value: parseEther("1000"), // Sends exactly 1.0 ether
    });

    const provider = ethers.provider;

    let balance = await provider.getBalance(contractAddress);

    expect(balance).to.equal(parseEther("1000"));

    const disperseTx = await faucet.disperse(addr1.address, parseEther("100"));

    await disperseTx.wait();

    balance = await provider.getBalance(contractAddress);

    expect(balance).to.equal(parseEther("900"));

    const setDripAmountTx = await faucet.setDripAmount(parseEther("5"));

    await setDripAmountTx.wait();

    const proof = "0xf7c151327ca22035527956655fa853a70809db355f7010441eef9043cb328114";

    let dripTx = await faucet.drip([proof]);

    // wait until the transaction is mined
    await dripTx.wait();

    balance = await provider.getBalance(contractAddress);

    expect(balance).to.equal(parseEther("895"));

    const newRoot = "0xfb5c8bbb58da751f6ff2fae4d5c625b55ceb3c001318c30897b2da132f1adf20";

    const updateTx = await faucet.updateRoot(newRoot);

    await updateTx.wait();

    expect(await faucet.merkleRoot()).to.equal(newRoot);

    try {
      dripTx = await faucet.drip([proof]);

      // wait until the transaction is mined
      await dripTx.wait();

      expect(true).to.equal(false);
    } catch (ex) {
      expect(ex.message).to.equal(`VM Exception while processing transaction: reverted with reason string 'Wait for the cooldown to request again'`);
    }

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
