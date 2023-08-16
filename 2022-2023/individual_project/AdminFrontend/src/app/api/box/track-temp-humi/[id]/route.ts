import { getContract, getProvider } from "@/functions/blockchain";
import { Contract, ethers, providers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: { params: { id: number } }) => {
  try {
    const provider: providers.JsonRpcProvider = await getProvider();
    const contract: Contract = await getContract();
    const paramsId: number = Number(res.params?.id);

    const blockNumber: number = await provider.getBlockNumber();
    const events = await contract.queryFilter("TrackBox", 0, blockNumber);

    interface TrackData {
      temperature: number | null;
      humidity: number | null;
    }

    let result: TrackData = {
      temperature: null,
      humidity: null,
    };

    events.forEach((event: ethers.Event, index: number, events: ethers.Event[]) => {
      const eventName: string = event.event || "";
      if (eventName !== "TrackBox") return;

      const boxId: number = event.args?._box.boxId.toNumber();
      if (!(boxId === paramsId)) return;

      if (event === null) return;

      result = {
        temperature: event.args?._temperature.toNumber(),
        humidity: event.args?._humidity.toNumber(),
      };
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Error: Fail to get box track data.", { status: 200 });
  }
};
