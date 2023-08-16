import { ethers } from "hardhat";
import { SupplyChain__factory, SupplyChain } from "../typechain-types";

const main = async () => {
  // Get the contract factory
  console.log("Getting contract factory...");
  const SupplyChainFactory: SupplyChain__factory = await ethers.getContractFactory("SupplyChain");
  console.log("Collected contract factory\n");

  // Deploy the contract
  console.log("Deploying SupplyChain contract...");
  const supplyChain: SupplyChain = await SupplyChainFactory.deploy();
  await supplyChain.deployed();
  console.log(`Deployed contract to: ${supplyChain.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
