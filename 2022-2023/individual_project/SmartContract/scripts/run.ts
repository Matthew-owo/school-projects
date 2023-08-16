import { ethers } from "hardhat";
import dayjs from "dayjs";
import * as dotenv from "dotenv";
dotenv.config();

import { SupplyChain, SupplyChain__factory } from "../typechain-types";
import { Result } from "@ethersproject/abi";
import { BigNumberish, ContractTransaction, ContractReceipt, BigNumber, Event } from "ethers";
import { PromiseOrValue, TypedEvent } from "../typechain-types/common";

const getAllEvents = async () => {
  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = await connectContract();

  // Load the emitted event logs
  console.log("Loading event logs...\n");

  // Set collect all event by name
  const eventName: string = "*";

  // Get events data
  const events: TypedEvent[] | undefined = await supplyChain.queryFilter(eventName);

  // Get box status list
  const boxStatusList: string[] | undefined = process.env.BOXSTATUSLIST?.split(",");

  // Loop all events
  events.forEach((event, index) => {
    const datetime: string | undefined = dayjs.unix(event.args._timestamp).format("YYYY-MM-DD HH:mm:ss");
    const eventName: string | undefined = event.event;
    let logContent: string = `${index + 1}. ${eventName}: `;

    switch (eventName) {
      case "CreateProduct":
        const productName: string = event.args._product.productNameZh;
        logContent += `Product name -> ${productName} `;
        break;

      case "CreateBox":
        logContent += `${boxStatusList[event.args._box.status]} `;
        break;

      case "ChangeBoxLocation":
        const from: string = event.args._from;
        const to: string = event.args._to;
        logContent += `${boxStatusList[event.args._box.status]} [${from} -> ${to}] `;
        break;

      case "TrackBox":
        const boxId: number = event.args._box.boxId;
        const isCompliance: boolean = event.args._isCompliance;
        const temp: number = event.args._temperature;
        const humi: number = event.args._humidity;
        if (isCompliance) {
          logContent += `${boxStatusList[event.args._box.status]} BoxID -> ${boxId} Temp -> ${temp}°C, Humi -> ${humi}% `;
        } else {
          logContent += `${boxStatusList[event.args._box.status]} BoxID -> ${boxId} Temp->${temp}°C Humi->${humi}% Not Compliance `;
        }
        break;
    }
    logContent += ` (${datetime})`;
    console.log(logContent);
    console.log("==================================================");
  });
};

const printEventDateTiem = (timestamp: number) => {
  const eventDate: string = dayjs.unix(timestamp).format("YYYY-MM-DD");
  const eventTime: string = dayjs.unix(timestamp).format("HH:mm:ss");
  console.log(`Event Emitted Date: ${eventDate}`);
  console.log(`Event Emitted Time: ${eventTime}`);
};

const printProductDetails = (product: SupplyChain.ProductStructOutput) => {
  console.log("======== Product Details ========");
  console.log(`Product ID: ${product.productId}`);
  console.log(`Product Name: ${product.productNameZh} || ${product.productNameEn}`);
  console.log(`Manufacturer Name: ${product.manufacturerNameZh} || ${product.manufacturerNameEn}`);
  console.log(`Recommended Storing Temperature: ${product.recommendedTemperature}°C`);
  console.log(`Recommended Storing Humidity: ${product.recommendedHumidity}%`);
  console.log(
    `Required Storing Temperature: ${product.requiredTemperatureLower}°C - ${product.requiredTemperatureUpper}°C`
  );
  console.log(`Required Storing Humidity: ${product.requiredHumidityLower}% - ${product.requiredHumidityUpper}%`);
  console.log(`Last Update: ${dayjs.unix(product.lastUpdate.toNumber()).format()}`);
  console.log("======== End of Product Details ========");
};

const printBoxDetails = (box: SupplyChain.BoxStructOutput) => {
  const boxStatusList: string[] | undefined = process.env.BOXSTATUSLIST?.split(",");

  console.log("======== Box Details ========");
  console.log(`Box ID: ${box.boxId}`);
  console.log(`Product ID: ${box.productId}`);
  console.log(`Quantity: ${box.quantity}`);
  console.log(`Weight: ${box.weight} kg`);
  console.log(`Value: $${box.value}`);
  console.log(`Status: ${boxStatusList[box.status]}`);
  console.log(`Is Compliance: ${box.isCompliance}`);
  console.log(`Production Date: ${box.productionDate}`);
  console.log(`Expiration Date: ${box.expirationDate}`);
  console.log(`Supplier: ${box.supplier}`);
  console.log(`Supermarket: ${box.supermarket}`);
  console.log(`Location: ${box.location}`);
  console.log(`Last Update: ${dayjs.unix(box.lastUpdate.toNumber()).format()}`);
  console.log("======== End of Box Details ========");
};

const printTrackBoxDetails = (event: Event) => {
  const box: SupplyChain.BoxStructOutput = event.args._box;

  console.log("======== Box Track Details ========");
  console.log(`Box ID: ${box.boxId}`);
  console.log(`Box Location: ${box.location}`);
  console.log(`Temperature: ${event.args._temperature}`);
  console.log(`Humidity: ${event.args._humidity}`);
  console.log(`Is Compliance: ${box.isCompliance}`);
  console.log("======== End of Box Track Details ========");
};

const printDeliveryDetails = (delivery: SupplyChain.DeliveryStructOutput) => {
  console.log("======== Delivery Details ========");
  console.log(`Delivery ID: ${delivery.deliveryId}`);
  console.log(`Boxes ID: ${delivery.boxesId}`);
  console.log(`Truck License Plate: ${delivery.truckLicensePlate}`);
  console.log(`Sender: ${delivery.sender}`);
  console.log(`Sender Address: ${delivery.senderAddress}`);
  console.log(`Receiver: ${delivery.receiver}`);
  console.log(`Receiver Address: ${delivery.receiverAddress}`);
  console.log(`Estimated Departure Datetime: ${delivery.estimatedDepartureDatetime}`);
  console.log(`Actual Departure Datetime: ${delivery.actualDepartureDatetime}`);
  console.log(`Estimated Arrival Datetime: ${delivery.estimatedArrivalDatetime}`);
  console.log(`Actual Arrival Datetime: ${delivery.actualArrivalDatetime}`);
  console.log(`Last Update: ${dayjs.unix(delivery.lastUpdate.toNumber()).format()}`);
};

const connectContract = async (): Promise<SupplyChain> => {
  // Get the contract address
  const address: string | any = process.env.CONTRACT_ADDRESS;

  // Get the contract factory
  const SupplyChainFactory = await ethers.getContractFactory("SupplyChain");

  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = SupplyChainFactory.attach(address);

  return supplyChain;
};

const deploy = async () => {
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

const supplierCreateProduct = async () => {
  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = await connectContract();

  // Declare the product details
  const productDetails: SupplyChain.ProductStruct = {
    productId: 0,
    productNameZh: "檸檬茶",
    productNameEn: "Lemon Tea",
    manufacturerNameZh: "維他",
    manufacturerNameEn: "VitaVitasoy",
    recommendedTemperature: 25,
    requiredTemperatureUpper: 40,
    requiredTemperatureLower: 5,
    recommendedHumidity: 30,
    requiredHumidityUpper: 70,
    requiredHumidityLower: 10,
    lastUpdate: 0,
  };

  // Create the product
  console.log("Creating the product...");

  // Run createProduct function then return the transaction details
  const tx: ContractTransaction = await supplyChain.createProduct(productDetails);

  // Wait the transaction to be mined and confirmed on the blockchain
  const txReceipt: ContractReceipt = await tx.wait();

  const product: SupplyChain.ProductStructOutput = txReceipt.events[0].args._product;
  const timestamp: number = txReceipt.events[0].args._timestamp.toNumber();

  printEventDateTiem(timestamp);
  // Get the created product from txReceipt -> events -> args -> _product
  printProductDetails(product);
};

const supplierCreateBox = async () => {
  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = await connectContract();

  // Declare the box details
  const boxDetails: SupplyChain.BoxStruct = {
    boxId: 0,
    productId: 1,
    quantity: 50,
    weight: 20,
    value: 250,
    status: 0,
    isCompliance: true,
    productionDate: dayjs().startOf("d").format("YYYY-MM-DD"),
    expirationDate: dayjs().startOf("d").add(1, "y").format("YYYY-MM-DD"),
    supplier: "Supplier A",
    supermarket: "NA",
    location: "Pending to store",
    lastUpdate: 0
  };

  // Create the box
  console.log("Creating the box...");

  // Run createBox function then return the transaction details
  const tx: ContractTransaction = await supplyChain.createBox(boxDetails);

  // Wait the transaction to be mined and confirmed on the blockchain
  const txReceipt: ContractReceipt = await tx.wait();

  // Get the created box from txReceipt -> events -> args -> _box
  const box: SupplyChain.BoxStructOutput = txReceipt.events[0].args?._box;
  const timestamp: number = txReceipt.events[0].args._timestamp.toNumber();

  printEventDateTiem(timestamp);
  printBoxDetails(box);
};

const supplierStoreBox = async (id: number, warehouse: string) => {
  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = await connectContract();

  // Run createBox function then return the transaction details
  const tx: ContractTransaction = await supplyChain.supplierStoredBox(id, warehouse);

  // Wait the transaction to be mined and confirmed on the blockchain
  const txReceipt: ContractReceipt = await tx.wait();

  const box: SupplyChain.BoxStructOutput = txReceipt.events[0].args?._box;
  const product: SupplyChain.ProductStructOutput = await supplyChain.s_products(box.productId);
  const timestamp: number = txReceipt.events[0].args._timestamp.toNumber();

  console.log("Box Stored");
  printEventDateTiem(timestamp);
  printBoxDetails(box);
  printProductDetails(product);
};

const trackBox = async (boxId: number, temperature: number, humidity: number) => {
  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = await connectContract();

  // Run trackBox function then return the transaction details
  const tx: ContractTransaction = await supplyChain.trackBox(boxId, 25, 40);

  // Wait the transaction to be mined and confirmed on the blockchain
  const txReceipt: ContractReceipt = await tx.wait();

  printTrackBoxDetails(txReceipt.events[0]);
};

const boxReadyToDelivery = async (delivery: SupplyChain.DeliveryStruct) => {
  // Get the contract connection
  const supplyChain: SupplyChain = await connectContract();

  // Run readyToDelivery function then return the transaction details
  const tx: ContractTransaction = await supplyChain.readyToDelivery(delivery);

  // Wait the transaction to be mined and confirmed on the blockchain
  const txReceipt: ContractReceipt = await tx.wait();

  const txDelivery: SupplyChain.DeliveryStructOutput = txReceipt.events[0].args?._delivery;

  printDeliveryDetails(txDelivery);
};

const boxSendTo = async (sendDateTime: string) => {
  // Get the contract connection
  const supplyChain: SupplyChain = await connectContract();

  // Run readyToDelivery function then return the transaction details
  const tx: ContractTransaction = await supplyChain.sendBox(1, sendDateTime);

  // Wait the transaction to be mined and confirmed on the blockchain
  const txReceipt: ContractReceipt = await tx.wait();

  txReceipt.events.forEach(event => {
    if (event.event === "SendBox") {
      const txDelivery: SupplyChain.DeliveryStructOutput = event.args?._delivery;
      printDeliveryDetails(txDelivery);
    }
  });
};

const supermarketSignForBox = async (receiveDateTime: string) => {
  // Get the contract connection
  const supplyChain: SupplyChain = await connectContract();

  // Run readyToDelivery function then return the transaction details
  const tx: ContractTransaction = await supplyChain.signForBox(1, receiveDateTime);

  // Wait the transaction to be mined and confirmed on the blockchain
  const txReceipt: ContractReceipt = await tx.wait();

  txReceipt.events.forEach(event => {
    if (event.event === "SignForBox") {
      const txDelivery: SupplyChain.DeliveryStructOutput = event.args?._delivery;
      printDeliveryDetails(txDelivery);
    }
  });
};

const supermarketStoreBox = async (id: number, warehouse: string) => {
  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = await connectContract();

  // Run createBox function then return the transaction details
  const tx: ContractTransaction = await supplyChain.supermarketStoredBox(id, warehouse);

  // Wait the transaction to be mined and confirmed on the blockchain
  const txReceipt: ContractReceipt = await tx.wait();

  const box: SupplyChain.BoxStructOutput = txReceipt.events[0].args?._box;
  const product: SupplyChain.ProductStructOutput = await supplyChain.s_products(box.productId);
  const timestamp: number = txReceipt.events[0].args._timestamp.toNumber();

  console.log("Box Stored");
  printEventDateTiem(timestamp);
  printBoxDetails(box);
  printProductDetails(product);
};

const testFunc = async () => {
  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = await connectContract();

  // Get the box details
  const box1: SupplyChain.BoxStructOutput = await supplyChain.s_boxes(1);
  const box2: SupplyChain.BoxStructOutput = await supplyChain.s_boxes(2);
  const box3: SupplyChain.BoxStructOutput = await supplyChain.s_boxes(3);
  // const txReceipt = await tx.wait();

  printBoxDetails(box1);
  printBoxDetails(box2);
  printBoxDetails(box3);
};

const main = async () => {
  
  // console.log("========== 1 ==========");
  // await deploy();
  // console.log();
  
  // const supplyChain: SupplyChain = await connectContract();
  // console.log("========== 2 ==========");
  // await supplierCreateProduct();
  // console.log();

  // console.log("========== 3 ==========");
  // await supplierCreateBox();
  // await supplierCreateBox();
  // await supplierCreateBox();
  // console.log();

  // console.log("========== 4 ==========");
  // await supplierStoreBox(1, "Warehouse A");
  // await supplierStoreBox(2, "Warehouse B");
  // await supplierStoreBox(3, "Warehouse C");
  // console.log();

  // console.log("========== 5 ==========");
  // const boxIds: BigNumber[] = await supplyChain.getBoxesByStatus(1);
  // for (let i = 0; i < boxIds.length; i++) {
  //   const boxId: number = boxIds[i].toNumber();
  //   const temperature: number = 25;
  //   const humidity: number = 40;
  //   await trackBox(boxId, temperature, humidity);
  // }
  // console.log();

  // console.log("========== 6 ==========");
  // // Declare the delivery details
  // const delivery: SupplyChain.DeliveryStruct = {
  //   deliveryId: 0,
  //   boxesId: [1, 2, 3],
  //   truckLicensePlate: "VH 1234",
  //   sender: "Supplier A",
  //   senderAddress: "123, Something Road, Tseung Kwan O, New Territories",
  //   receiver: "Supermarket A",
  //   receiverAddress: "新界 將軍澳 XX道 123號",
  //   estimatedDepartureDatetime: "2023-05-10 08:00",
  //   actualDepartureDatetime: "NA",
  //   estimatedArrivalDatetime: "2023-05-10 09:00",
  //   actualArrivalDatetime: "NA",
  //   lastUpdate: 0,
  // };
  // await boxReadyToDelivery(delivery);
  // console.log();

  // console.log("========== 7 ==========");
  // const sendDateTime: string = "2023-05-10 08:05";
  // await boxSendTo(sendDateTime);

  // console.log("========== 8 ==========");
  // const receiveDateTime: string = "2023-05-10 09:05";
  // await supermarketSignForBox(receiveDateTime);

  // console.log("========== 9 ==========");
  // await supermarketStoreBox(1, "Supermarket A (Warehouse A)");

  console.log("========== 10 ==========");
  await getAllEvents();
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
