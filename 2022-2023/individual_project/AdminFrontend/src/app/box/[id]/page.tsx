"use client";
import BoxForm from "@/components/BoxForm";
import Box from "@/interfaces/Box";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Product = ({ params }) => {
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

  const fetchBox = async () => {
    const response = await fetch(`/api/box/${params?.id}`);
    const data = await response.json();
    setBox(data);
  };

  useEffect(() => {
    fetchBox();
  }, []);

  const handleBack = () => {
    router.push("/box");
  };

  return <BoxForm type="View" box={box} handleBack={handleBack} />;
};

export default Product;
