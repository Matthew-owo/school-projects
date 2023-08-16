"use client";
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@/components/@mui/material";
import Image from "next/image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const ProductDetails = () => {
  return (
    <Stack direction="column" m={1}>
      <Breadcrumbs
        maxItems={2}
        aria-label="breadcrumb"
        sx={{
          border: "1px solid #E3E3E3",
          padding: "5px",
        }}
      >
        <Link underline="hover" color="inherit" href="/">
          首頁
        </Link>
        <Link underline="hover" color="inherit" href="/">
          產品目錄
        </Link>
        <Link underline="hover" color="inherit" href="/">
          中央處理器
        </Link>
        <Typography color="text.primary">
          INTEL CORE i9-13900K 24Core 32Threads
        </Typography>
      </Breadcrumbs>
      {/* Details */}
      <Stack direction="row">
        <Image
          src="/products/I9 13900K.png"
          alt="I9 13900k"
          width={500}
          height={360}
        />
        <Stack direction="column" spacing={3}>
          <Box
            p={1}
            sx={{ bgcolor: "#4192E8", color: "white", width: "fit-content" }}
          >
            現貨
          </Box>
          <Typography variant="body1" fontWeight="bold">
            INTEL CORE i9-13900K 24Core 32Threads
          </Typography>
          <Typography variant="body1">商品貨號：I-B-I913900K</Typography>
          <Typography variant="body1">商品品牌：Intel</Typography>
          <Typography variant="body1">
            售價：
            <Typography color="error" fontWeight="bold" component="span">
              $4999.00
            </Typography>
          </Typography>
          <Stack direction="row">
            <Button variant="outlined" color="info">
              -
            </Button>
            <TextField
              size="small"
              value={1}
              inputProps={{ min: 0, style: { textAlign: "center" } }}
              focused
            />
            <Button variant="outlined" color="info">
              +
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="info" fullWidth>
              <AddShoppingCartIcon />
              加入購物車
            </Button>
            <Button variant="contained" color="success" fullWidth>
              <ShoppingBagIcon />
              立即購買
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductDetails;
