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
  console.log("Storing the box...");

  for (let i = 1; i <= 6; i++) {
    const tx: ContractTransaction = await supplyChain.supplierStoredBox(i, "Warehouse A");
    await tx.wait();
  }

  for (let i = 7; i <= 12; i++) {
    const tx: ContractTransaction = await supplyChain.supplierStoredBox(i, "Warehouse B");
    await tx.wait();
  }

  for (let i = 13; i <= 18; i++) {
    const tx: ContractTransaction = await supplyChain.supplierStoredBox(i, "Warehouse C");
    await tx.wait();
  }

  for (let i = 19; i <= 24; i++) {
    const tx: ContractTransaction = await supplyChain.supplierStoredBox(i, "Warehouse D");
    await tx.wait();
  }

  for (let i = 25; i <= 30; i++) {
    const tx: ContractTransaction = await supplyChain.supplierStoredBox(i, "Warehouse E");
    await tx.wait();
  }

  for (let i = 31; i <= 36; i++) {
    const tx: ContractTransaction = await supplyChain.supplierStoredBox(i, "Warehouse F");
    await tx.wait();
  }

  console.log("Finished");
};

main();