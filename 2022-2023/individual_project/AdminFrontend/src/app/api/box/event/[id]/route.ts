import { getContract, getProvider } from "@/functions/blockchain";
import dayjs from "dayjs";
import { Contract, ethers, providers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: { params: { id: number } }) => {
  try {
    const provider: providers.JsonRpcProvider = await getProvider();
    const contract: Contract = await getContract();
    const paramsId: number = Number(res.params.id);

    const blockNumber: number = await provider.getBlockNumber();
    const events = await contract.queryFilter("*", 0, blockNumber);

    interface CustomEventObject {
      eventName: string;
      from?: string;
      to?: string;
      temperature?: number;
      humidity?: number;
      timestamp: number;
    }

    let result: CustomEventObject[] = new Array<CustomEventObject>();
    events.forEach((event: ethers.Event, index: number, events: ethers.Event[]) => {
      if (!event.args?._box) return;

      const boxId: number = event.args?._box.boxId.toNumber();

      if (!(boxId === paramsId)) return;

      const eventName: string = event.event || "";
      switch (eventName) {
        case "CreateBox":
          result.push({
            eventName: eventName,
            timestamp: event.args?._timestamp.toNumber(),
          });
          break;
        case "ChangeBoxLocation":
          result.push({
            eventName: eventName,
            from: event.args?._from,
            to: event.args?._to,
            timestamp: event.args?._timestamp.toNumber(),
          });
          break;
        case "TrackBox":
          if (!(typeof events[index + 1] === undefined))
            if (!(events[index + 1].event === "TrackBox"))
              result.push({
                eventName: eventName,
                temperature: event.args?._temperature.toNumber(),
                humidity: event.args?._humidity.toNumber(),
                timestamp: event.args?._timestamp.toNumber(),
              });
          break;
        case "BoxStoredIsNotCompliance":
          result.push({
            eventName: eventName,
            temperature: event.args?._temperature.toNumber(),
            humidity: event.args?._humidity.toNumber(),
            timestamp: event.args?._timestamp.toNumber(),
          });
          break;
        case "BoxStoredIsNotCompliance":
          result.push({
            eventName: eventName,
            timestamp: event.args?._timestamp.toNumber(),
          });
          break;
        case "BoxHasRecalled":
          result.push({
            eventName: eventName,
            timestamp: event.args?._timestamp.toNumber(),
          });
          break;
      }
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error: Fail to get box details.", { status: 200 });
  }
};
