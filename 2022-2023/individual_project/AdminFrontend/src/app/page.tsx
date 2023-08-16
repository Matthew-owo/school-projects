"use client";
import { Grid } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";

import MenuButton from "@/components/MenuButton";

export default function Home() {
  return (
    <Grid container justifyContent="center" alignContent="center" spacing={1} marginTop={1} component="div">
      <Grid item xs={4} md={4} lg={3} xl={2} textAlign="center">
        <MenuButton icon={<AddCircleIcon />} name="Create Product" href="/product/create" />
      </Grid>
      <Grid item xs={2} textAlign="center">
        <MenuButton icon={<ShoppingCartOutlinedIcon />} name="Product List" href="/product" />
      </Grid>

      <Grid item xs={12} />

      <Grid item xs={4} md={4} lg={3} xl={2} textAlign="center">
        <MenuButton icon={<AddCircleIcon />} name="Create Box" href="/box/create" color="secondary" />
      </Grid>
      <Grid item xs={2} textAlign="center">
        <MenuButton icon={<PrecisionManufacturingIcon />} name="Box List" href="/box" color="secondary" />
      </Grid>

      <Grid item xs={12} />

      <Grid item xs={4} md={4} lg={3} xl={2} textAlign="center">
        <MenuButton icon={<AddCircleIcon />} name="Create Delivery" href="/delivery/create" color="warning" />
      </Grid>
      <Grid item xs={2} textAlign="center">
        <MenuButton icon={<LocalShippingIcon />} name="Delivery List" href="/delivery" color="warning" />
      </Grid>
    </Grid>
  );
}
