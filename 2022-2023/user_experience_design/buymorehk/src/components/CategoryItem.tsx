import { MenuItem, Typography } from "@/components/@mui/material";
import CategoryImage from "./CategoryImage";
import React from "react";

type CategoryItemProp = {
  src: string;
  alt: string;
  name: string;
  handleClick: () => void
};

const CategoryItem: React.FC<CategoryItemProp> = ({ src, alt, name, handleClick }) => {
  return (
    <MenuItem onClick={handleClick} disableRipple>
      <CategoryImage src={src} alt={alt} />
      <Typography variant="body1" sx={{ fontWeight: "normal" }} paddingLeft={2}>
        {name}
      </Typography>
    </MenuItem>
  );
};

export default CategoryItem;
