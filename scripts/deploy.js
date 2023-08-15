async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const EtherFaucet = await ethers.getContractFactory("EtherFaucet");

  const root = "0xfb5c8bbb58da751f6ff2fae4d5c625b55ceb3c001318c30897b2da132f1adf20";

  const faucet = await EtherFaucet.deploy(root);

  console.log("Faucet Address:", await faucet.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
