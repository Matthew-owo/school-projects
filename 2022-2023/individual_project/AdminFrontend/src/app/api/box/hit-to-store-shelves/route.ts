import { Contract, Wallet, ethers, providers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

import { getContract } from "@/functions/blockchain";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { boxId } = await req.json();

    const supplyChain: Contract = await getContract();

    const tx = await supplyChain.supermarketHitBoxToTheStoreShelves(boxId);

    await tx.wait();
    
    return new Response(`Box ID: ${boxId} hit to the store shelves`, { status: 200 });
  } catch (error) {
    return new Response("Error: Fail to hit to the store shelves.", { status: 500 });
  }
};
