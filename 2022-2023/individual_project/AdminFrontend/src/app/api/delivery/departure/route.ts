import { Contract } from "ethers";
import { getContract } from "@/functions/blockchain";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { deliveryId, sendDatetime } = await req.json();

    const supplyChain: Contract = await getContract();

    const tx = await supplyChain.sendBox(deliveryId, sendDatetime);

    await tx.wait();

    return new Response(`Delivery is sended on ${sendDatetime}`, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error: Fail to departure the box.", { status: 500 });
  }
};
