import { Contract, Wallet, ethers, providers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

import { getContract } from "@/functions/blockchain";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { box } = await req.json();

    const supplyChain: Contract = await getContract();
    
    const tx = await supplyChain.createBox({
      boxId: 0,
      productId: box.productId,
      quantity: box.quantity,
      weight: box.weight,
      value: box.value,
      status: 0,
      isCompliance: true,
      productionDate: box.productionDate,
      expirationDate: box.expirationDate,
      supplier: box.supplier,
      supermarket: "NA",
      location: "Pending to store",
      lastUpdate: 0
    });
    await tx.wait();
    
    return new Response(box, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error: Fail to create new box.", { status: 500 });
  }
};
