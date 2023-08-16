import { BigNumber } from "ethers";

interface Product {
  productId: number | BigNumber;
  productNameZh: string;
  productNameEn: string;
  productType: string;
  manufacturerNameZh: string;
  manufacturerNameEn: string;
  recommendedTemperature: number | BigNumber | "";
  requiredTemperatureUpper: number | BigNumber | "";
  requiredTemperatureLower: number | BigNumber | "";
  recommendedHumidity: number | BigNumber | "";
  requiredHumidityUpper: number | BigNumber | "";
  requiredHumidityLower: number | BigNumber | "";
  lastUpdate: number | BigNumber | string | "";
}

export default Product;
