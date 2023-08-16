"use client";
import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@/components/@mui/material";
import Search from "./Search";
import { useState } from "react";
import { CPU_LIST } from "@/constants/cpu_list";
import ProductCard from "./ProductCard";

function valuetext(value: number) {
  return `$${value}`;
}

const ProductList = () => {
  const [value, setValue] = useState([0, 55000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      border="1px solid #E3E3E3"
      p={1}
      width="100%"
    >
      <Stack
        direction="row"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body1">找到了 xx 件產品</Typography>
        <Search />
      </Stack>
      <Divider />
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography variant="body1">價錢：</Typography>
        <TextField size="small" value={0} sx={{ width: "100px" }} />
        <Slider
          getAriaLabel={() => "Price range"}
          min={0}
          max={55000}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          sx={{ width: "200px" }}
        />
        <TextField size="small" value={55000} sx={{ width: "100px" }} />
      </Stack>
      <Divider />
      <Stack direction="row" display="flex" alignItems="center">
        <Typography variant="body1">廠商：</Typography>
        <FormGroup row>
          <FormControlLabel control={<Checkbox />} label="AMD" />
          <FormControlLabel control={<Checkbox />} label="Intel" />
        </FormGroup>
      </Stack>
      <Divider />
      <Grid container spacing={1} paddingRight={1}>
        {CPU_LIST.map((item) => (
          <Grid item xs={3} my={1}>
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid>
      <Stack display="flex" alignItems="center">
        <Pagination count={10} />
      </Stack>
    </Stack>
  );
};

export default ProductList;
