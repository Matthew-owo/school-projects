import { getContract } from "@/functions/blockchain";
import dayjs from "dayjs";
import { Contract } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: { params: { id: number } }) => {
  try {
    const contract: Contract = await getContract();
    const paramsId: number = res.params?.id;

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
    } = await contract.s_deliveries(paramsId);

    const result = {
      deliveryId: deliveryId.toNumber(),
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
      lastUpdate: dayjs.unix(lastUpdate.toNumber()).format(),
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error: Fail to get delivery details.", { status: 500 });
  }
};
