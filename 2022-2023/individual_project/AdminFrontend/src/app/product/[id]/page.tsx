"use client";
import { Button } from "@/components/@mui/material";
import ProductForm from "@/components/ProductForm";
import Product from "@/interfaces/Product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Product = ({ params }) => {
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

  const fetchProduct = async () => {
    const response = await fetch(`/api/product/${params?.id}`);
    const data = await response.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleBack = () => {
    router.push("/product");
  };

  return <ProductForm type="View" product={product} handleBack={handleBack} />;
};

export default Product;
