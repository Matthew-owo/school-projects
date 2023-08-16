"use client";
import ProductForm from "@/components/ProductForm";
import Product from "@/interfaces/Product";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const CreateProduct = () => {
  const router = useRouter();

  const [product, setProduct] = useState<Product>({
    productId: 0,
    productNameZh: "",
    productNameEn: "",
    manufacturerNameZh: "",
    manufacturerNameEn: "",
    recommendedTemperature: "",
    requiredTemperatureUpper: "",
    requiredTemperatureLower: "",
    recommendedHumidity: "",
    requiredHumidityUpper: "",
    requiredHumidityLower: "",
    lastUpdate: 0,
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const createProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/product/new", {
        method: "POST",
        body: JSON.stringify({
          product: product,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const backPage = () => {
    router.push("/");
  }

  return (
    <ProductForm
      type="Create"
      product={product}
      setProduct={setProduct}
      submitting={submitting}
      handleSubmit={createProduct}
      handleBack={backPage}
    />
  );
};

export default CreateProduct;
