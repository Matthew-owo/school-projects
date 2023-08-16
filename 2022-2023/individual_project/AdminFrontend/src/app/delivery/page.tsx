"use client";
import { Button, Container, Stack } from "@mui/material";
import { GridRenderCellParams, GridColDef, DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const DeliveryList = () => {
  const [delivery, setDelivery] = useState([]);

  const router = useRouter();

  const gridRenderCellButton = (params: GridRenderCellParams) => {
    const handleViewDeliveryClick = (e: React.SyntheticEvent) => {
      e.stopPropagation(); // don't select this row after clicking
      router.push(`/delivery/${params.id}`);
    };
    return (
      <Button onClick={handleViewDeliveryClick} variant="contained">
        View
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "deliveryId", headerName: "ID", width: 70 },
    { field: "truckLicensePlate", headerName: "Truck License Plate", width: 150 },
    { field: "sender", headerName: "Sender", flex: 1 },
    { field: "receiver", headerName: "Receiver", flex: 1 },
    { field: "estimatedDepartureDatetime", headerName: "Estimated Departure Datetime", width: 210 },
    { field: "estimatedArrivalDatetime", headerName: "Estimated Arrival Datetime", width: 210 },
    { field: "actualDepartureDatetime", headerName: "Actual Departure Datetime", width: 210 },
    { field: "actualArrivalDatetime", headerName: "Actual Arrival Datetime", width: 210 },
    {
      field: "action",
      headerName: "View",
      renderCell: gridRenderCellButton,
    },
  ];

  const fetchDeliveries = async () => {
    const response = await fetch("/api/delivery");
    const data = await response.json();
    setDelivery(data);
  };

  const handleBack = () => {
    router.push("/");
  };

  useEffect(() => {
    fetchDeliveries();
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
          <DataGrid
            rows={delivery}
            columns={columns}
            getRowId={(row) => row?.deliveryId}
            initialState={{ sorting: { sortModel: [{ field: "deliveryId", sort: "desc" }] } }}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default DeliveryList;
