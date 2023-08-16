"use client";
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@/components/@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import NextLink from "next/link";

const Cart = () => {
  return (
    <Stack direction="column" m={1} spacing={1}>
      <Typography variant="h6">購物車</Typography>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Image
            src="/products/CPU/Intel/13th/i9.jpeg"
            alt="i9"
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack direction="column">
            <Typography variant="body1" fontSize={15}>
              【i9-13900K】INTEL CORE i9-13900K 24Core 32Threads【盒裝/三年保】
            </Typography>
            <Typography variant="body1" fontSize={13}>
              Intel
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" color="error" fontWeight="bold">
            $4390.00
          </Typography>
        </Grid>
        <Grid item xs={2} paddingLeft={1}>
          <Stack direction="row" height={40}>
            <Button
              variant="outlined"
              color="info"
              size="small"
              sx={{ minWidth: 33, width: 33, minHeight: 33, height: 33 }}
            >
              -
            </Button>
            <TextField
              size="small"
              value={1}
              inputProps={{
                min: 0,
                style: { textAlign: "center", paddingTop: 5, paddingBottom: 5 },
              }}
              sx={{ minWidth: 60, width: 60, minHeight: 33, height: 33 }}
            />
            <Button
              variant="outlined"
              color="info"
              size="small"
              sx={{ minWidth: 33, width: 33, minHeight: 33, height: 33 }}
            >
              +
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={1} paddingLeft={3}>
          <CloseIcon />
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Image
            src="/products/【RTX4080】MSI RTX4080 GAMING X TRIO 16GB DISPLAY CARD.png"
            alt="rtx 3080"
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack direction="column">
            <Typography variant="body1" fontSize={15}>
              【RTX4080】MSI RTX4080 GAMING X TRIO 16GB DISPLAY CARD
            </Typography>
            <Typography variant="body1" fontSize={13}>
              MSI
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" color="error" fontWeight="bold">
            $10250.00
          </Typography>
        </Grid>
        <Grid item xs={2} paddingLeft={1}>
          <Stack direction="row" height={40}>
            <Button
              variant="outlined"
              color="info"
              size="small"
              sx={{ minWidth: 33, width: 33, minHeight: 33, height: 33 }}
            >
              -
            </Button>
            <TextField
              size="small"
              value={1}
              inputProps={{
                min: 0,
                style: { textAlign: "center", paddingTop: 5, paddingBottom: 5 },
              }}
              sx={{ minWidth: 60, width: 60, minHeight: 33, height: 33 }}
            />
            <Button
              variant="outlined"
              color="info"
              size="small"
              sx={{ minWidth: 33, width: 33, minHeight: 33, height: 33 }}
            >
              +
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={1} paddingLeft={3}>
          <CloseIcon />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end">
        <Typography variant="body1" fontWeight="bold">
          總額：
        </Typography>
        <Typography variant="body1" color="error" fontWeight="bold">
          $14,640.00
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button variant="contained" color="error">
          清空購物車
        </Button>
        <Button
          variant="contained"
          color="info"
          component={NextLink}
          href="/checkout"
        >
          前往結帳
        </Button>
      </Stack>
    </Stack>
  );
};

export default Cart;
