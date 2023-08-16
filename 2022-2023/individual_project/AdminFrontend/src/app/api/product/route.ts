import { getContract } from "@/functions/blockchain";
import Product from "@/interfaces/Product";
import dayjs from "dayjs";
import { BigNumber, Contract } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const supplyChain: Contract = await getContract();

    const products = await supplyChain.getAllProducts();

    let result: Product[] = [];
    products.forEach((product: Product) => {
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
      } = product;

      const productPush = {
        productId: (productId as BigNumber).toNumber(),
        productNameZh: productNameZh,
        productNameEn: productNameEn,
        productType: productType,
        manufacturerNameZh: manufacturerNameZh,
        manufacturerNameEn: manufacturerNameEn,
        recommendedTemperature: (recommendedTemperature as BigNumber).toNumber(),
        requiredTemperatureUpper: (requiredTemperatureUpper as BigNumber).toNumber(),
        requiredTemperatureLower: (requiredTemperatureLower as BigNumber).toNumber(),
        recommendedHumidity: (recommendedHumidity as BigNumber).toNumber(),
        requiredHumidityUpper: (requiredHumidityUpper as BigNumber).toNumber(),
        requiredHumidityLower: (requiredHumidityLower as BigNumber).toNumber(),
        lastUpdate: dayjs.unix((lastUpdate as BigNumber).toNumber()).format(),
      };
      result.push(productPush);
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};
