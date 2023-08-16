import { ethers } from "hardhat";
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

import { SupplyChain } from "../typechain-types";
import { BigNumber, ContractReceipt, ContractTransaction, Event } from "ethers";

const connectContract = async (): Promise<SupplyChain> => {
  // Get the contract address
  const address: string | any = process.env.CONTRACT_ADDRESS;

  // Get the contract factory
  const SupplyChainFactory = await ethers.getContractFactory("SupplyChain");

  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = SupplyChainFactory.attach(address);

  return supplyChain;
};

const track = async () => {
  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = await connectContract();

  // Get the box details
  const boxInSupplier: BigNumber[] = await supplyChain.getBoxesByStatus(1);
  const boxInReadyDelivery: BigNumber[] = await supplyChain.getBoxesByStatus(2);
  const boxOnDelivery: BigNumber[] = await supplyChain.getBoxesByStatus(3);
  const boxInSupermarket: BigNumber[] = await supplyChain.getBoxesByStatus(5);

  const getRndInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  // Track box state
  console.log("Tracking box states...\n");

  // Track boxInSupplier
  for (let i = 0; i < boxInSupplier.length; i++) {
    const boxId: number = boxInSupplier[i].toNumber();

    // Get random number of temperature and humidity
    const trackTemperature: number = getRndInteger(10, 30);
    const trackHumidity: number = getRndInteger(10, 90);

    // Run trackBox function then return the transaction details
    const tx: ContractTransaction = await supplyChain.trackBox(boxId, trackTemperature, trackHumidity);

    // Wait the transaction to be mined and confirmed on the blockchain
    const txReceipt: ContractReceipt = await tx.wait();

    // Get the emitted event details from txReceipt
    const events: Event[] | undefined = txReceipt.events;

    // Get the status list
    const boxStatusList: string[] | undefined = process.env.BOXSTATUSLIST?.split(",");

    const trackedBox: SupplyChain.BoxStructOutput | undefined = events[0].args?._box;
    const boxStatus: string | undefined = boxStatusList[trackedBox?.status];
    const temperature: number | undefined = events[0].args?._temperature;
    const humidity: number | undefined = events[0].args?._humidity;
    const timestamp: string | undefined = dayjs.unix(events[0].args?._timestamp).format();

    console.log("============ Track Data ============");
    console.log(`Box ID: ${trackedBox?.boxId}`);
    console.log(`Box Status: ${boxStatus}`);
    console.log(`Temperature: ${temperature}°C`);
    console.log(`Humidity: ${humidity}%`);
    console.log(`Timestamp: ${timestamp}`);
    console.log("====================================");
  }
};

console.log("Start box tracking...");
setInterval(track, 5000);
