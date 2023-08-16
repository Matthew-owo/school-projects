import { Contract, Wallet, ethers, providers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

import { getContract } from "@/functions/blockchain";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { product } = await req.json();

    const supplyChain: Contract = await getContract();

    const tx = await supplyChain.createProduct(product);
    await tx.wait();

    return new Response(product, { status: 200 });
  } catch (error) {
    return new Response("Create product failure", { status: 500 });
  }
};
