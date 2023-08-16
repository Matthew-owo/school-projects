"use client";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import Result from "./Result";
import Product from "@/interfaces/Product";
import ProductsListOption from "@/interfaces/ProductsListOption";
import SearchResult from "@/interfaces/SerchResult";

const Search = () => {
  const [productsList, setProductsList] = useState<ProductsListOption[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductsListOption | null>(null);
  const [pdExpSelect, setPdExpSelect] = useState<string>("");
  const [datePicked, setDatePicked] = useState<Dayjs | null>(dayjs());
  const [selectedSupermarket, setSelectedSupermarket] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [result, setResult] = useState<SearchResult[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
          selectedProduct: selectedProduct,
          pdExpSelect: pdExpSelect,
          datePicked: datePicked?.format("YYYY-MM-DD"),
          selectedSupermarket: selectedSupermarket,
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchProductsList = async () => {
    const response = await fetch("/api/product");
    const data = await response.json();

    let result: ProductsListOption[] = [];
    data.forEach((product: Product) => {
      result.push({
        id: product.productId as number,
        label: product.productNameEn,
      });
    });

    setProductsList(result);
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  return (
    <>
      <SearchForm
        productsList={productsList}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        pdExpSelect={pdExpSelect}
        setPdExpSelect={setPdExpSelect}
        datePicked={datePicked}
        setDatePicked={setDatePicked}
        selectedSupermarket={selectedSupermarket}
        setSelectedSupermarket={setSelectedSupermarket}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
      <Result
        result={result}
      />
    </>
  );
};

export default Search;
