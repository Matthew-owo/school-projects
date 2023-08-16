import NextLink from "next/link";
import { Button, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ReactNode } from "react";

interface MenuButtonProps {
  icon: ReactNode;
  name: string;
  href: string;
  color?: string;
  disabled?: boolean;
}

const MenuButton = ({ icon, name, href, color = "primary", disabled = false }: MenuButtonProps) => {
  return (
    <Button
      href={href}
      variant="contained"
      component={NextLink}
      sx={{ width: "250px", height: "250px" }}
      color={color}
      disabled={disabled}
    >
      <Stack sx={{ alignItems: "center" }}>
        {icon}
        <Typography variant="h6">{name}</Typography>
      </Stack>
    </Button>
  );
};

export default MenuButton;
