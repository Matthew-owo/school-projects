"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Delivery from "@/interfaces/Delivery";
import DeliveryForm from "@/components/DeliveryForm";

const Delivery = ({ params }) => {
  const router = useRouter();

  const [delivery, setDelivery] = useState<Delivery>({
    deliveryId: 0,
    boxesId: [],
    truckLicensePlate: "",
    sender: "",
    senderAddress: "",
    receiver: "",
    receiverAddress: "",
    estimatedDepartureDatetime: "",
    actualDepartureDatetime: "",
    estimatedArrivalDatetime: "",
    actualArrivalDatetime: "",
    lastUpdate: "",
  });

  const fetchDelivery = async () => {
    const response = await fetch(`/api/delivery/${params?.id}`);
    const data = await response.json();
    setDelivery(data);
  };

  useEffect(() => {
    fetchDelivery();
  }, []);

  const handleBack = () => {
    router.push("/delivery");
  };

  return <DeliveryForm type="View" delivery={delivery} handleBack={handleBack} />;
};

export default Delivery;
