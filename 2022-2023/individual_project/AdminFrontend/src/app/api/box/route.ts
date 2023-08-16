import { getContract } from "@/functions/blockchain";
import Box from "@/interfaces/Box";
import dayjs from "dayjs";
import { BigNumber, Contract } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const supplyChain: Contract = await getContract();

    const boxes = await supplyChain.getAllBoxes();

    const boxStatusList: string[] | undefined = process.env.BOX_STATUS_LIST?.split(",");

    let result: Box[] = [];
    boxes.forEach((box: Box) => {
      const {
        boxId,
        productId,
        quantity,
        weight,
        value,
        status,
        isCompliance,
        productionDate,
        expirationDate,
        supplier,
        supermarket,
        location,
        lastUpdate,
      } = box;

      const boxPush = {
        boxId: (boxId as BigNumber).toNumber(),
        productId: (productId as BigNumber).toNumber(),
        quantity: (quantity as BigNumber).toNumber(),
        weight: (weight as BigNumber).toNumber(),
        value: (value as BigNumber).toNumber(),
        status: boxStatusList?.[status as number] as string,
        isCompliance: isCompliance,
        productionDate: productionDate,
        expirationDate: expirationDate,
        supplier: supplier,
        supermarket: supermarket,
        location: location,
        lastUpdate: dayjs.unix((lastUpdate as BigNumber).toNumber()).format(),
      };
      result.push(boxPush);
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all boxes", { status: 500 });
  }
};
