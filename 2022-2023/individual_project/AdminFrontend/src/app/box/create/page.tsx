"use client";
import { Stack } from "@/components/@mui/material";
import BoxForm from "@/components/BoxForm";
import { FormEvent, useState } from "react";

import Box from "@/interfaces/Box";

import { useRouter } from "next/navigation";

const BoxCreate = () => {
  const router = useRouter();

  const [box, setBox] = useState<Box>({
    boxId: "",
    productId: "",
    quantity: 0,
    weight: 0,
    value: 0,
    status: "",
    isCompliance: true,
    productionDate: "",
    expirationDate: "",
    supplier: "",
    supermarket: "",
    location: "",
    lastUpdate: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const createBox = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/box/new", {
        method: "POST",
        body: JSON.stringify({
          box: box,
        }),
      });

      if (response.ok) {
        router.push("/box");
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
    <BoxForm
      type="Create"
      box={box}
      setBox={setBox}
      submitting={submitting}
      handleSubmit={createBox}
      handleBack={handleBack}
    />
  );
};

export default BoxCreate;
