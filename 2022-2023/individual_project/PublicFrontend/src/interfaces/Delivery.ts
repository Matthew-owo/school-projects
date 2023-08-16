import { BigNumber } from "ethers";

interface Delivery {
  deliveryId: number | BigNumber;
  boxesId: number[] | BigNumber[];
  truckLicensePlate: string;
  sender: string;
  senderAddress: string;
  receiver: string;
  receiverAddress: string;
  estimatedDepartureDatetime: string;
  actualDepartureDatetime: string;
  estimatedArrivalDatetime: string;
  actualArrivalDatetime: string;
  lastUpdate: number | string | "";
}

export default Delivery;
