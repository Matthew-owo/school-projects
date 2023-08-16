"use client";
import { Button, Container, Stack } from "@/components/@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const router = useRouter();

  const gridRenderCellButton = (params: GridRenderCellParams) => {
    const handleViewProductClick = (e: React.SyntheticEvent) => {
      e.stopPropagation(); // don't select this row after clicking
      router.push(`/product/${params.id}`);
    };
    return (
      <Button onClick={handleViewProductClick} variant="contained">
        View
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", width: 70 },
    { field: "productNameZh", headerName: "Product Name (Chinese)", flex: 1 },
    { field: "productType", headerName: "Type", flex: 1 },
    { field: "manufacturerNameZh", headerName: "Manufacturer Name (Chinese)", flex: 1 },
    {
      field: "action",
      headerName: "View",
      renderCell: gridRenderCellButton,
    },
  ];

  const fetchProducts = async () => {
    const response = await fetch("/api/product");
    const data = await response.json();
    setProducts(data);
  };

  const handleBack = () => {
    router.push("/");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={1} marginTop={2}>
        <Stack direction="row">
          <Button variant="outlined" color="secondary" onClick={handleBack}>
            Back
          </Button>
        </Stack>
        <Stack direction="row">
          <DataGrid rows={products} columns={columns} getRowId={(row) => row?.productId} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default ProductList;
