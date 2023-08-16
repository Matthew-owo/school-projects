import { getContract } from "@/functions/blockchain";
import Delivery from "@/interfaces/Delivery";
import { Contract } from "ethers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, res: { param: any }) => {
  try {
    const { delivery } = await req.json();

    const supplyChain: Contract = await getContract();

    const tx = await supplyChain.readyToDelivery({
      deliveryId: 0,
      boxesId: delivery.boxesId,
      truckLicensePlate: delivery.truckLicensePlate,
      sender: delivery.sender,
      senderAddress: delivery.senderAddress,
      receiver: delivery.receiver,
      receiverAddress: delivery.receiverAddress,
      estimatedDepartureDatetime: delivery.estimatedDepartureDatetime,
      actualDepartureDatetime: "NA",
      estimatedArrivalDatetime: delivery.estimatedArrivalDatetime,
      actualArrivalDatetime: "NA",
      lastUpdate: 0,
    });
    await tx.wait();

    return new Response(tx, { status: 200 });
  } catch (error) {
    console.log(error);
    new Response("ERROR: Fail to create delivery", { status: 500 });
  }
};
