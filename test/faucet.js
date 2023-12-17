const { expect } = require("chai");
const { parseEther } = require("viem");

describe("Happy Holidays", function () {
  it("Deploys contract and allows user to join", async function () {
    const DeployedContract = await ethers.getContractFactory("HappyHolidays");

    const contract = await DeployedContract.deploy();

    const [owner, addr1] = await ethers.getSigners();

    // await contract.mint();

    await contract.giftTo(addr1.address);

    const recipes = Array.from(Array(25).keys()).map(() => addr1);

    await contract.giftToMultiple(recipes);

    // const contractAddress = await contract.getAddress();

    // const [owner, addr1] = await ethers.getSigners();

    // // expect(await contract.owner()).to.equal(owner.address);

    // // await owner.sendTransaction({
    // //   to: contractAddress,
    // //   value: parseEther("1000"), // Sends exactly 1.0 ether
    // // });

    // const provider = ethers.provider;

    // let balance = await provider.getBalance(contractAddress);

    // expect(balance).to.equal(parseEther("0"));

    // try {
    //   const joinTx = await contract.join("henry");

    //   await joinTx.wait();
    // } catch (ex) {
    //   expect(ex.message).to.equal(`VM Exception while processing transaction: reverted with reason string 'Insufficient funds to join DAO'`);
    // }

    // try {
    //   const leaveTx = await contract.leave();

    //   await leaveTx.wait();
    // } catch (ex) {
    //   expect(ex.message).to.equal(`VM Exception while processing transaction: reverted with reason string 'Only members can call this function'`);
    // }

    // try {
    //   const proposeTx = await contract.proposeSelf();

    //   await proposeTx.wait();
    // } catch (ex) {
    //   expect(ex.message).to.equal(`VM Exception while processing transaction: reverted with reason string 'Only members can call this function'`);
    // }

    // try {
    //   const joinTx = await contract.join("henry", { value: parseEther("0.05") });

    //   await joinTx.wait();

    //   expect(await contract.member_count()).to.equal(1);

    //   const memberName = await contract.readMemberName(owner.address);

    //   expect(memberName).to.equal("henry");
    // } catch (ex) {
    //   console.log(ex);
    // }
    // const disperseTx = await contract.disperse(addr1.address, parseEther("100"));

    // await disperseTx.wait();

    // balance = await provider.getBalance(contractAddress);

    // expect(balance).to.equal(parseEther("900"));

    // const setDripAmountTx = await contract.setDripAmount(parseEther("5"));

    // await setDripAmountTx.wait();

    // const proof = "0xf7c151327ca22035527956655fa853a70809db355f7010441eef9043cb328114";

    // let dripTx = await contract.drip([proof]);

    // // wait until the transaction is mined
    // await dripTx.wait();

    // balance = await provider.getBalance(contractAddress);

    // expect(balance).to.equal(parseEther("895"));

    // const newRoot = "0xfb5c8bbb58da751f6ff2fae4d5c625b55ceb3c001318c30897b2da132f1adf20";

    // const updateTx = await contract.updateRoot(newRoot);

    // await updateTx.wait();

    // expect(await contract.merkleRoot()).to.equal(newRoot);

    // try {
    //   dripTx = await contract.drip([proof]);

    //   // wait until the transaction is mined
    //   await dripTx.wait();

    //   expect(true).to.equal(false);
    // } catch (ex) {
    //   expect(ex.message).to.equal(`VM Exception while processing transaction: reverted with reason string 'Wait for the cooldown to request again'`);
    // }

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
