import { Contract, Wallet, ethers, providers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

import { getContract } from "@/functions/blockchain";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { boxId, warehouse } = await req.json();

    const supplyChain: Contract = await getContract();

    const tx = await supplyChain.supplierStoredBox(boxId, warehouse);

    await tx.wait();
    
    return new Response(`Box ID: ${boxId} stored in ${warehouse}`, { status: 200 });
  } catch (error) {
    return new Response("Error: Fail to store the box.", { status: 500 });
  }
};
