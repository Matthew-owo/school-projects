import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@/components/@mui/material";
import { COMPONENTS, COMPUTER, PERIPHERALS } from "@/constants/category";
import React from "react";

const CategoryList = () => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 250,
        bgcolor: "background.paper",
        border: "1px solid #DFDFDF",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          產品列表
        </ListSubheader>
      }
    >
      <Divider sx={{ bgcolor: "#DFDFDF" }} />
      {COMPONENTS.map((item) => (
        <ListItemButton>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
      <Divider sx={{ bgcolor: "#DFDFDF" }} />
      {PERIPHERALS.map((item) => (
        <ListItemButton>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
      <Divider sx={{ bgcolor: "#DFDFDF" }} />
      {COMPUTER.map((item) => (
        <ListItemButton>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </List>
    // <Stack direction="column" border="1px solid #DFDFDF" p={1} width={200}>
    //   <Box
    //     display="flex"
    //     justifyContent="center"
    //     sx={{ backgroundColor: "#FFFFFF" }}
    //   >
    //     <Typography variant="body2" fontWeight="normal">
    //       產品分類
    //     </Typography>
    //   </Box>
    //   <Divider />

    // </Stack>
  );
};

export default CategoryList;
