import { BigNumber } from "ethers";

interface Box {
  boxId: number | BigNumber | "";
  productId: number | BigNumber | "";
  quantity: number | BigNumber | "";
  weight: number | BigNumber | "";
  value: number | BigNumber;
  status: string | number | "";
  isCompliance: boolean;
  productionDate: string;
  expirationDate: string;
  supplier: string;
  supermarket: string;
  location: string;
  lastUpdate: number | BigNumber | string | "";
}

export default Box;
