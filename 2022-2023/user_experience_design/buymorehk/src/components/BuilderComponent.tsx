"use client";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link, Stack, Typography } from "./@mui/material";
import NextLink from "next/link";

type BuilderComponentProp = {
  name: string;
};

const BuilderComponent: React.FC<BuilderComponentProp> = ({ name }) => {
  return (
    <Link href="/builder/cpu" component={NextLink} underline="none" sx={{ color: "black" }}>
      <Stack
        direction="row"
        display="flex"
        justifyContent="space-between"
        px={1}
        py={0.5}
        sx={{ bgcolor: "#EEEEEE" }}
      >
        <Typography variant="body2">{name}</Typography>
        <AddCircleOutlineIcon fontSize="small" />
      </Stack>
    </Link>
  );
};

export default BuilderComponent;
