"use client";
import {
  Button,
  Divider,
  Grid,
  Menu,
  MenuProps,
  Stack,
  Typography,
  alpha,
  styled,
} from "@/components/@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NextLink from "next/link";
import React, { useState } from "react";
import CategoryItem from "./CategoryItem";
import { COMPONENTS, COMPUTER, PERIPHERALS } from "@/constants/category";
import { useRouter } from "next/navigation";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={3}
    anchorReference="anchorPosition"
    anchorPosition={{ top: 80, left: 960 }}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Navigation = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    router.push("/category/cpu");
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={15}
      sx={{ backgroundColor: "#BFB084" }}
      borderRadius={10}
      mx={1}
    >
      <Button
        id="product-menu-button"
        aria-controls={open ? "product-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        color="inherit"
        sx={{
          fontWeight: "normal",
        }}
      >
        產品目錄
      </Button>
      <StyledMenu
        id="product-menu"
        MenuListProps={{
          "aria-labelledby": "product-menu-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Grid container p={1}>
          {/* Components */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "normal" }}>
              電腦組件
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 0.5 }} />
          </Grid>
          {COMPONENTS.map((item) => (
            <Grid item xs={3}>
              <CategoryItem
                src={item.src}
                alt={item.alt}
                name={item.name}
                handleClick={handleClose}
              />
            </Grid>
          ))}
          {/* Peripherals */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "normal" }}>
              週邊設備
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 0.5 }} />
          </Grid>
          {PERIPHERALS.map((item) => (
            <Grid item xs={3}>
              <CategoryItem
                src={item.src}
                alt={item.alt}
                name={item.name}
                handleClick={handleClose}
              />
            </Grid>
          ))}
          {/* Computer */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "normal" }}>
              原廠電腦
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 0.5 }} />
          </Grid>
          {COMPUTER.map((item) => (
            <Grid item xs={3}>
              <CategoryItem
                src={item.src}
                alt={item.alt}
                name={item.name}
                handleClick={handleClose}
              />
            </Grid>
          ))}
        </Grid>
      </StyledMenu>
      <Button
        component={NextLink}
        href="/sets"
        color="inherit"
        sx={{
          fontWeight: "normal",
        }}
      >
        電腦組合
      </Button>
      <Button
        component={NextLink}
        href="/builder"
        color="inherit"
        sx={{
          fontWeight: "normal",
        }}
      >
        自選組裝
      </Button>
      <Button
        component={NextLink}
        href="/qna"
        color="inherit"
        sx={{
          fontWeight: "normal",
        }}
      >
        常見問題
      </Button>
    </Stack>
  );
};

export default Navigation;
