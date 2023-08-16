"use client";
import React from "react";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <Grid container>
      <Grid item xs={10}>
        <Link href="/">
          <Image
            src="/banner.png"
            alt="company logo"
            width={200}
            height={45}
            priority
          />
        </Link>
      </Grid>
      <Grid
        item
        xs={2}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <IconButton aria-label="shopping-cart" component={Link} href="/cart">
          <ShoppingCartOutlinedIcon />
        </IconButton>
        <IconButton aria-label="shopping-cart" component={Link} href="/member">
          <PersonOutlineOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
