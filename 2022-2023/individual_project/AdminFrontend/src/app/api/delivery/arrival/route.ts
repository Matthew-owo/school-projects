import { Contract } from "ethers";
import { getContract } from "@/functions/blockchain";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { deliveryId, arrivalDatetime } = await req.json();

    const supplyChain: Contract = await getContract();

    const tx = await supplyChain.signForBox(deliveryId, arrivalDatetime);

    await tx.wait();

    return new Response(`Delivery is arrived on ${arrivalDatetime}`, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("ERROR: Fail to sign box", { status: 500 });
  }
};
