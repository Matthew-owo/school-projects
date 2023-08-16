"use client";
import { Button } from "./@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const AddToShoppingCartButton = () => {
  return (
    <Button variant="contained" color="info">
      <ShoppingCartOutlinedIcon />
      加到購物車
    </Button>
  );
};

export default AddToShoppingCartButton;
