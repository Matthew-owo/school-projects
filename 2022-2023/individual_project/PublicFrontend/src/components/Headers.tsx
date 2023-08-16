"use client";
import { Grid, Typography } from "@mui/material";
import React from "react";

const Headers = () => {
  return (
    <Grid
      container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      p={5}
    >
      <Grid item>
        <Typography variant="h3">
          Supply Chain Public Website
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Headers;
