"use client";
import DeliveryForm from "@/components/DeliveryForm";
import Delivery from "@/interfaces/Delivery";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const DeliveryCreate = () => {
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

  const [submitting, setSubmitting] = useState<boolean>(false);

  const createDelivery = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/delivery/new", {
        method: "POST",
        body: JSON.stringify({
          delivery: delivery,
        }),
      });

      if (response.ok) {
        router.push("/delivery");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <DeliveryForm
      type="Create"
      delivery={delivery}
      setDelivery={setDelivery}
      submitting={submitting}
      handleSubmit={createDelivery}
      handleBack={handleBack}
    />
  );
};

export default DeliveryCreate;
