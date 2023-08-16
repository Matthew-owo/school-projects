import { Stack, Typography } from "@/components/@mui/material";
import Image from "next/image";

type RecommendedProductsListProp = {
  title: string;
};

type ProductItemProp = {
  src: string;
  alt: string;
  name: string;
  price: string;
};

const ProductItem: React.FC<ProductItemProp> = ({ src, alt, name, price }) => {
  return (
    <Stack
      direction="column"
      sx={{ ":hover": { backgroundColor: "#F0F0F0", cursor: "pointer" } }}
      p={1}
    >
      <Image src={src} alt={alt} width={200} height={200} />
      <Typography variant="body1">{name}</Typography>
      <Typography variant="body1" color="error" fontWeight="bold">{price}</Typography>
    </Stack>
  );
};

const RecommendedProductsList: React.FC<RecommendedProductsListProp> = ({
  title,
}) => {
  const productList: { name: string; src: string; price: string }[] = [
    {
      name: "【RTX4080】MSI RTX4080 GAMING X TRIO 16GB DISPLAY CARD",
      src: "/products/【RTX4080】MSI RTX4080 GAMING X TRIO 16GB DISPLAY CARD.png",
      price: "$9900.00",
    },
    {
      name: "【RTX4090】ASUS TUF RTX4090 OC 24G GAMING (3 Solt:349mm)",
      src: "/products/【RTX4090】ASUS TUF RTX4090 OC 24G GAMING (3 Solt:349mm).png",
      price: "$15650.00",
    },
    {
      name: "【RTX4090】GALAX RTX4090 SG (3 Solt:355mm)",
      src: "/products/【RTX4090】GALAX RTX4090 SG (3 Solt:355mm).png",
      price: "$13230.00",
    },
    {
      name: "【RTX4090】ZOTAC RTX4090 AMP Extreme AIRO(3.5 Solt:352mm)",
      src: "/products/【RTX4090】ZOTAC RTX4090 AMP Extreme AIRO(3.5 Solt:352mm).png",
      price: "$13350.00",
    },
  ];

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: "normal" }}>
        {title}
      </Typography>
      <Stack direction="row">
        {productList.map((product) => (
          <ProductItem
            src={product.src}
            alt={product.name}
            name={product.name}
            price={product.price}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default RecommendedProductsList;
