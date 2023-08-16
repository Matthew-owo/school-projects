import { getContract } from "@/functions/blockchain";
import Delivery from "@/interfaces/Delivery";
import dayjs from "dayjs";
import { BigNumber, Contract } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const supplyChain: Contract = await getContract();

    const deliveries = await supplyChain.getAllDeliveries();

    let result: Delivery[] = [];
    deliveries.forEach((delivery: Delivery) => {
      const {
        deliveryId,
        boxesId,
        truckLicensePlate,
        sender,
        senderAddress,
        receiver,
        receiverAddress,
        estimatedDepartureDatetime,
        actualDepartureDatetime,
        estimatedArrivalDatetime,
        actualArrivalDatetime,
        lastUpdate,
      } = delivery;

      const deliveryPush = {
        deliveryId: (deliveryId as BigNumber).toNumber(),
        boxesId: boxesId,
        truckLicensePlate: truckLicensePlate,
        sender: sender,
        senderAddress: senderAddress,
        receiver: receiver,
        receiverAddress: receiverAddress,
        estimatedDepartureDatetime: estimatedDepartureDatetime,
        actualDepartureDatetime: actualDepartureDatetime,
        estimatedArrivalDatetime: estimatedArrivalDatetime,
        actualArrivalDatetime: actualArrivalDatetime,
        lastUpdate: dayjs.unix((lastUpdate as BigNumber).toNumber()).format(),
      };
      result.push(deliveryPush);
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all deliveries", { status: 500 });
  }
};
