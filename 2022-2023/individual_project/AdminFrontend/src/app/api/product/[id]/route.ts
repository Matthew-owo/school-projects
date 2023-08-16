import { getContract } from "@/functions/blockchain";
import dayjs from "dayjs";
import { Contract } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: { params: { id: number } }) => {
  try {
    const contract: Contract = await getContract();
    const paramsId: number = res.params?.id;

    const {
      productId,
      productNameZh,
      productNameEn,
      productType,
      manufacturerNameZh,
      manufacturerNameEn,
      recommendedTemperature,
      requiredTemperatureUpper,
      requiredTemperatureLower,
      recommendedHumidity,
      requiredHumidityUpper,
      requiredHumidityLower,
      lastUpdate,
    } = await contract.s_products(paramsId);

    const result = {
      productId: productId.toNumber(),
      productNameZh: productNameZh,
      productNameEn: productNameEn,
      productType: productType,
      manufacturerNameZh: manufacturerNameZh,
      manufacturerNameEn: manufacturerNameEn,
      recommendedTemperature: recommendedTemperature.toNumber(),
      requiredTemperatureUpper: requiredTemperatureUpper.toNumber(),
      requiredTemperatureLower: requiredTemperatureLower.toNumber(),
      recommendedHumidity: recommendedHumidity.toNumber(),
      requiredHumidityUpper: requiredHumidityUpper.toNumber(),
      requiredHumidityLower: requiredHumidityLower.toNumber(),
      lastUpdate: dayjs.unix(lastUpdate.toNumber()).format(),
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Error: Fail to get product details.", { status: 200 });
  }
};
