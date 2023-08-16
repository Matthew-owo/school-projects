import { getContract } from "@/functions/blockchain";
import dayjs from "dayjs";
import { Contract } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: { params: { id: number } }) => {
  try {
    const contract: Contract = await getContract();
    const paramsId: number = res.params.id;

    const boxStatusList: string[] | undefined = process.env.BOX_STATUS_LIST?.split(",");

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
    } = await contract.s_boxes(paramsId);

    const result = {
      boxId: boxId.toNumber(),
      productId: productId.toNumber(),
      quantity: quantity.toNumber(),
      weight: weight.toNumber(),
      value: value.toNumber(),
      status: boxStatusList?.[status],
      isCompliance: isCompliance,
      productionDate: dayjs(productionDate),
      expirationDate: dayjs(expirationDate),
      supplier: supplier,
      supermarket: supermarket,
      location: location,
      lastUpdate: dayjs.unix(lastUpdate.toNumber()).format(),
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Error: Fail to get box details.", { status: 200 });
  }
};
