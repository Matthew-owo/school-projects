"use client";
import { Button, Container, Stack, styled } from "@mui/material";
import { GridRenderCellParams, GridColDef, DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const BoxList = () => {
  const [box, setBox] = useState([]);

  const router = useRouter();

  const gridRenderCellButton = (params: GridRenderCellParams) => {
    const handleViewProductClick = (e: React.SyntheticEvent) => {
      e.stopPropagation(); // don't select this row after clicking
      router.push(`/box/${params.id}`);
    };
    return (
      <Button onClick={handleViewProductClick} variant="contained">
        View
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "boxId", headerName: "ID", width: 70 },
    { field: "productId", headerName: "Product ID", width: 90 },
    { field: "quantity", headerName: "Quantity", width: 90 },
    { field: "weight", headerName: "Weight", width: 90 },
    { field: "value", headerName: "Value", width: 90 },
    { field: "productionDate", headerName: "Production Date", width: 150 },
    { field: "expirationDate", headerName: "Expiration Date", width: 150 },
    { field: "supplier", headerName: "Supplier", flex: 1 },
    { field: "supermarket", headerName: "Supermarket", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "action",
      headerName: "View",
      renderCell: gridRenderCellButton,
    },
  ];

  const StyledDataGrid = styled(DataGrid)(() => ({
    "& .is-compliance-true": {
      backgroundColor: "#C0D8C1",
      "&:hover": {
        backgroundColor: "#ABCBAD",
      },
      "&.Mui-selected": {
        backgroundColor: "#81B185",
        "&:hover": {
          backgroundColor: "#81B185",
        },
      },
    },
    "& .is-compliance-false": {
      backgroundColor: "#F1C0C0",
      "&:hover": {
        backgroundColor: "#EDABAB",
      },
      "&.Mui-selected": {
        backgroundColor: "#E99797",
        "&:hover": {
          backgroundColor: "#E48282",
        },
      },
    },
  }));

  const fetchProducts = async () => {
    const response = await fetch("/api/box");
    const data = await response.json();
    setBox(data);
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
          <StyledDataGrid
            rows={box}
            columns={columns}
            getRowId={(row) => row?.boxId}
            initialState={{ sorting: { sortModel: [{ field: "boxId", sort: "desc" }] } }}
            getRowClassName={(params) => `is-compliance-${params.row.isCompliance}`}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default BoxList;
