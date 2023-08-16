import { Stack } from "@/components/@mui/material";
import AcceptCookies from "@/components/AcceptCookies";
import PromotionCarousel from "@/components/PromotionCarousel";
import RecommendedProductsList from "@/components/RecommendedProductsList";
import Search from "@/components/Search";

export default function Home() {
  return (
    <Stack direction="column" spacing={3} px={1} mt={2}>
      <Search />
      <PromotionCarousel />
      <RecommendedProductsList title="推薦商品" />
      <RecommendedProductsList title="最新商品" />
      <RecommendedProductsList title="熱賣商品" />
      <AcceptCookies />
    </Stack>
  );
}
