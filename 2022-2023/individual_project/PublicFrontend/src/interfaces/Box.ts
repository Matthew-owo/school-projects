import { BigNumber } from "ethers";

interface Box {
  boxId: BigNumber | string | number | "";
  productId: BigNumber | string | number | "";
  quantity: BigNumber | string | number | "";
  weight: BigNumber | string | number | "";
  value: BigNumber | string | number | "";
  status: string | number | "";
  isCompliance: boolean;
  productionDate: string;
  expirationDate: string;
  supplier: string;
  supermarket: string;
  location: string;
  lastUpdate: BigNumber | string | number | "";
}

export default Box;
