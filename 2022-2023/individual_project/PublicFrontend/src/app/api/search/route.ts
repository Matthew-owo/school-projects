import BoxStatus from "@/constants/BoxStatus";
import { getContract, getProvider } from "@/functions/blockchain";
import Box from "@/interfaces/Box";
import { BigNumber, Contract, ethers, providers } from "ethers";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import CustomEvent from "@/interfaces/CustomEvent";
import SearchResult from "@/interfaces/SerchResult";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { selectedProduct, pdExpSelect, datePicked, selectedSupermarket } =
      await req.json();

    // Get contract
    const supplyChain: Contract = await getContract();

    // Get all boxes
    const boxes: Box[] = await supplyChain.getAllBoxes();
    const boxStatusList: string[] = BoxStatus;

    // Get block number
    const provider: providers.JsonRpcProvider = await getProvider();
    const blockNumber: number = await provider.getBlockNumber();

    // Get all events
    const events = await supplyChain.queryFilter("*", 0, blockNumber);

    let result: SearchResult[] = [];
    boxes.forEach((box: Box) => {
      const {
        boxId,
        productId,
        quantity,
        weight,
        value,
        status,
        isCompliance,
        productionDate,
        expirationDate,
        supplier,
        supermarket,
        location,
        lastUpdate,
      } = box;

      if ((productId as BigNumber).toNumber() !== selectedProduct.id) return;

      if (supermarket !== selectedSupermarket) return;

      if (pdExpSelect === "Production Date") {
        if (productionDate !== datePicked) return;
      } else {
        if (expirationDate !== datePicked) return;
      }

      let resultEvent: CustomEvent[] = [];
      events.forEach(
        (event: ethers.Event, index: number, events: ethers.Event[]) => {
          // Check if event is or not include _box
          if (!event.args?._box) return;
          
          // Get the boxId from event
          const eBoxId: number = event.args?._box.boxId.toNumber();
          
          // Check if event.boxId is or not equals than boxId
          if ((boxId as BigNumber).toNumber() !== eBoxId) return;
          
          // Get the event name
          const eventName: string = event?.event || "";

          // Find the corresponding event
          switch (eventName) {
            case "CreateBox":
              resultEvent.push({
                eventName: eventName,
                timestamp: event.args?._timestamp.toNumber(),
              });
              break;
            case "ChangeBoxLocation":
              resultEvent.push({
                eventName: eventName,
                from: event.args?._from,
                to: event.args?._to,
                timestamp: event.args?._timestamp.toNumber(),
              });
              break;
            case "TrackBox":
              if (!(events[index + 1].event === "TrackBox"))
                resultEvent.push({
                  eventName: eventName,
                  temperature: event.args?._temperature.toNumber(),
                  humidity: event.args?._humidity.toNumber(),
                  timestamp: event.args?._timestamp.toNumber(),
                });
              break;
            case "BoxStoredIsNotCompliance":
              resultEvent.push({
                eventName: eventName,
                temperature: event.args?._temperature.toNumber(),
                humidity: event.args?._humidity.toNumber(),
                timestamp: event.args?._timestamp.toNumber(),
              });
              break;
            case "BoxStoredIsNotCompliance":
              resultEvent.push({
                eventName: eventName,
                timestamp: event.args?._timestamp.toNumber(),
              });
              break;
            case "BoxHasRecalled":
              resultEvent.push({
                eventName: eventName,
                timestamp: event.args?._timestamp.toNumber(),
              });
              break;
          }
        }
      );

      const resultPush: SearchResult = {
        boxId: (boxId as BigNumber).toNumber(),
        quantity: (quantity as BigNumber).toNumber(),
        weight: (weight as BigNumber).toNumber(),
        value: (value as BigNumber).toNumber(),
        status: boxStatusList[Number(status)],
        isCompliance: isCompliance,
        productionDate: productionDate,
        expirationDate: expirationDate,
        supplier: supplier,
        supermarket: supermarket,
        location: location,
        events: resultEvent,
      };
      result.push(resultPush);
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("ERROR: Fail to fetch boxes.", { status: 500 });
  }
};
