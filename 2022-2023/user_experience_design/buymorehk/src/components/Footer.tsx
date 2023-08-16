import { Divider, Grid, Stack, Typography } from "@/components/@mui/material";

const Footer = () => {
  return (
    <Grid container p={2}>
      <Grid item xs={2}>
        <Typography variant="body2">新手上路</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2">付款和運送</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2">服務保證</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2">會員中心</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2">售後服務</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2">其他</Typography>
      </Grid>
      <Grid item xs={12} my={1}>
        <Divider sx={{ backgroundColor: "black" }} />
      </Grid>
      <Grid item xs={2}>
        <Stack direction="column">
          <Typography variant="body2">購物流程</Typography>
          <Typography variant="body2">訂購方法</Typography>
          <Typography variant="body2">訂單處理程序</Typography>
          <Typography variant="body2">問題集</Typography>
          <Typography variant="body2">組裝流程介紹</Typography>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Stack direction="column">
          <Typography variant="body2">付款方式</Typography>
          <Typography variant="body2">運送方式/地區/收費</Typography>
          <Typography variant="body2">信用咭付款</Typography>
          <Typography variant="body2">香港/澳門便利店取件服務</Typography>
          <Typography variant="body2">特急送貨服務</Typography>
          <Typography variant="body2">支付訂單訂金</Typography>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Stack direction="column">
          <Typography variant="body2">產品保用 / 質量保證</Typography>
          <Typography variant="body2">14天有壞包換保證</Typography>
          <Typography variant="body2">得獎項目 / 用家評論</Typography>
          <Typography variant="body2">退貨及更換</Typography>
          <Typography variant="body2">產品環保責任條例</Typography>
          <Typography variant="body2">除舊服務條款</Typography>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Stack direction="column">
          <Typography variant="body2">我的訂單</Typography>
          <Typography variant="body2">14天有壞包換保證</Typography>
          <Typography variant="body2">免責聲明及私隱政策</Typography>
          <Typography variant="body2">會員優惠</Typography>
          <Typography variant="body2">購物車</Typography>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Stack direction="column">
          <Typography variant="body2">技術支援</Typography>
          <Typography variant="body2">下載</Typography>
          <Typography variant="body2">代理資料</Typography>
          <Typography variant="body2">電腦組合支援</Typography>
          <Typography variant="body2">上門服務</Typography>
          <Typography variant="body2">改裝升級</Typography>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Stack direction="column">
          <Typography variant="body2">行家/生意合作</Typography>
          <Typography variant="body2">電腦租借服務</Typography>
          <Typography variant="body2">FACEBOOK專頁</Typography>
          <Typography variant="body2">自選主機圖庫</Typography>
          <Typography variant="body2">二手回收</Typography>
          <Typography variant="body2">代訂舊款零件</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} my={1}>
        <Divider sx={{ backgroundColor: "black" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          Copyright © 2005-2023 BUYMORE.HK 版權所有，並保留所有權利。
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          灣仔軒尼詩道298號298電腦特區UG樓156-159號鋪 Tel: 3171 3499 E-mail:
          ask@buymore.hk
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
