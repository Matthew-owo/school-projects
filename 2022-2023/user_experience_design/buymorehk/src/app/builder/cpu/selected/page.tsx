"use client";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@/components/@mui/material";
import AddToShoppingCartButton from "@/components/AddToShoppingCartButton";
import BuilderComponent from "@/components/BuilderComponent";
import { COMPONENTS } from "@/constants/category";
import { CPU_BUILD_LIST } from "@/constants/cpu_list";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';

const BuilderCpuSelected = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/builder/cpu/selected");
  };

  return (
    <Box border="1px solid #EFEFEF" m={1}>
      <Stack direction="row">
        {/* List */}
        <Stack
          direction="column"
          spacing={2}
          p={1}
          border="1px solid #EFEFEF"
          sx={{ width: "100%" }}
        >
          <Stack direction="row">
            <Select value={1} size="small">
              <MenuItem value="0">推薦組合</MenuItem>
              {COMPONENTS.map((item, index) => (
                <MenuItem value={index + 1}>{item.name}</MenuItem>
              ))}
            </Select>
            <TextField size="small" placeholder="搜尋商品" fullWidth />
          </Stack>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 700,
              "& ul": { padding: 0 },
            }}
          >
            {CPU_BUILD_LIST.map((item) => (
              <ListItem disablePadding sx={{ border: "1px solid #EFEFEF" }}>
                <ListItemButton
                  disableGutters
                  sx={{ padding: 0 }}
                  onClick={handleClick}
                >
                  <ListItemIcon>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={100}
                      height={100}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      paddingLeft: 1,
                    }}
                    secondary={item.price}
                    secondaryTypographyProps={{
                      color: "error",
                      fontWeight: "bold",
                      fontSize: "inherit",
                      paddingLeft: 1,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        {/* Selected */}
        <Stack direction="column" sx={{ width: "100%" }} m={1} spacing={1}>
          {COMPONENTS.map((item) => {
            if (item.name == "CPU 中央處理器") {
              return (
                <>
                  <BuilderComponent name={item.name} />
                  <Stack direction="row" alignItems="center" spacing={1} paddingRight={1}>
                    <Image
                      src="/products/CPU/Intel/13th/i3.jpeg"
                      width={60}
                      height={60}
                      alt={"cpu"}
                    />
                    <Typography variant="body2" fontSize={13}>
                      【i3-12100】INTEL CORE i3-12100 4Core
                      8Threads/12M/最高4.30 GHz【散裝/三年保】
                    </Typography>
                    <Typography variant="body2" color="error" fontWeight="bold">
                      $800.00
                    </Typography>
                    <DeleteIcon />
                  </Stack>
                </>
              );
            }
            return <BuilderComponent name={item.name} />;
          })}
          <Stack
            direction="column"
            display="flex"
            alignItems="flex-end"
            spacing={1}
          >
            <Stack direction="row" alignItems="center">
              <Typography variant="body1">砌機服務：</Typography>
              <Select value={1} size="small">
                <MenuItem value="1">需要</MenuItem>
                <MenuItem value="2">不需要</MenuItem>
              </Select>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography variant="body1">貨品：</Typography>
              <Typography variant="body1" color="error" fontWeight="bold">
                $800.00
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography variant="body1">總計：</Typography>
              <Typography variant="body1" color="error" fontWeight="bold">
                $800.00
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <AddToShoppingCartButton />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BuilderCpuSelected;
