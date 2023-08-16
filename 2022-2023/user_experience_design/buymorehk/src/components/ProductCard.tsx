import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Badge,
} from "@/components/@mui/material";
import Link from "next/link";

type ProductCardProp = {
  item: {
    src: string;
    alt: string;
    name: string;
    price: string;
    status: string;
  };
};

const ProductCard: React.FC<ProductCardProp> = ({ item }) => {
  return (
    <Link href="/product/cpu">
      <Badge
        color="error"
        badgeContent={item.status}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{ width: "100%" }}
      >
        <Card
          elevation={3}
          sx={{
            width: "inherit",
            ":hover": { bgcolor: "#F0F0F0" },
          }}
        >
          <CardMedia sx={{ height: 90 }} image={item.src} title={item.alt} />
          <CardContent>
            <Typography
              gutterBottom
              variant="body1"
              fontWeight="bold"
              component="div"
            >
              {item.name}
            </Typography>
            <Typography variant="body2" color="error" fontWeight="bold">
              {item.price}
            </Typography>
          </CardContent>
        </Card>
      </Badge>
    </Link>
  );
};

export default ProductCard;
