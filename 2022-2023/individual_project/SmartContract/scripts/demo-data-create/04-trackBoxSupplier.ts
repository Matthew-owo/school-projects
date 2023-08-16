import { ethers } from "hardhat";
import dayjs from "dayjs";
import * as dotenv from "dotenv";
dotenv.config();

import { SupplyChain, SupplyChain__factory } from "../../typechain-types";
import { Result } from "@ethersproject/abi";
import { BigNumberish, ContractTransaction, ContractReceipt, BigNumber, Event } from "ethers";
import { PromiseOrValue, TypedEvent } from "../../typechain-types/common";

const connectContract = async (): Promise<SupplyChain> => {
  // Get the contract address
  const address: string | any = process.env.CONTRACT_ADDRESS;

  // Get the contract factory
  const SupplyChainFactory = await ethers.getContractFactory("SupplyChain");

  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = SupplyChainFactory.attach(address);

  return supplyChain;
};

const main = async () => {
  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = await connectContract();

  // Create the box
  console.log("Tracking the box...");

  const tx: ContractTransaction = await supplyChain.trackBox(74, 5, 50);
  await tx.wait();

  // for (let i = 1; i <= 36; i++) {
  //   const tx: ContractTransaction = await supplyChain.trackBox(i, 3, 50);
  //   await tx.wait();
  // }

  console.log("Finished");
};

main();