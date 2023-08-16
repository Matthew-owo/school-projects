import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@/components/@mui/material";
import StyledTextarea from "@/components/StyledTextarea";
import Image from "next/image";

const Checkout = () => {
  return (
    <Stack direction="column" m={1} border="1px solid #E0E0E0">
      <Typography variant="h6" borderBottom="1px solid #E0E0E0" p={1}>
        1 運送選項
      </Typography>
      <Stack direction="column" p={1} borderBottom="1px solid #E0E0E0">
        <RadioGroup
          aria-labelledby="delivery-option"
          defaultValue="1"
          name="radio-buttons-group"
          row
          sx={{ marginLeft: 1.5 }}
        >
          <FormControlLabel
            value="1"
            control={
              <Box
                sx={{
                  border: "2px solid #65AFD5",
                  borderRadius: 2,
                  paddingX: 4,
                  paddingY: 1,
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Typography variant="body2" fontWeight="bold">
                    小件送貨
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    1-3 個工作天
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    免運費
                  </Typography>
                </Stack>
              </Box>
            }
            label=""
          />
          <FormControlLabel
            value="2"
            control={
              <Box
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
                  paddingX: 4,
                  paddingY: 1,
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Typography variant="body2" fontWeight="bold">
                    標準送貨
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    1-3 個工作天
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    $85
                  </Typography>
                </Stack>
              </Box>
            }
            label=""
          />
          <FormControlLabel
            value="3"
            control={
              <Box
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
                  paddingX: 4,
                  paddingY: 1,
                  height: "80px",
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Typography variant="body2" fontWeight="bold">
                    門市自取
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0 }}
                    fontWeight="bold"
                  >
                    1-3 個工作天
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    免費
                  </Typography>
                </Stack>
              </Box>
            }
            label=""
          />
          <FormControlLabel
            value="4"
            control={
              <Box
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
                  paddingX: 4,
                  paddingY: 1,
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Typography variant="body2" fontWeight="bold">
                    特快送貨
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    即晚
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    $200
                  </Typography>
                </Stack>
              </Box>
            }
            label=""
          />
        </RadioGroup>
      </Stack>
      <Typography variant="h6" borderBottom="1px solid #E0E0E0" p={1}>
        2 收貨資料
      </Typography>
      <Grid container>
        <Grid item xs={6} p={1}>
          <TextField
            label="收貨人姓氏"
            variant="outlined"
            size="small"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6} p={1}>
          <TextField
            label="收貨人名字"
            variant="outlined"
            size="small"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6} p={1}>
          <TextField
            label="聯絡電郵"
            variant="outlined"
            size="small"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6} p={1}>
          <TextField
            label="聯絡電話"
            variant="outlined"
            size="small"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6} p={1}>
          <TextField
            label="座/樓/室"
            variant="outlined"
            size="small"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6} p={1}>
          <TextField
            label="地區/街道/大廈"
            variant="outlined"
            size="small"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6} p={1}>
          <TextField
            label="公司名稱"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} p={1}>
          <StyledTextarea />
        </Grid>
      </Grid>
      <Typography variant="h6" borderBottom="1px solid #E0E0E0" p={1}>
        3 付款方式
      </Typography>
      <Stack direction="column" p={1} borderBottom="1px solid #E0E0E0">
        <RadioGroup
          aria-labelledby="payment-option"
          defaultValue="1"
          name="radio-buttons-group"
          row
          sx={{ marginLeft: 1.5 }}
        >
          <FormControlLabel
            value="1"
            control={
              <Box
                sx={{
                  border: "2px solid #65AFD5",
                  borderRadius: 2,
                  paddingX: 4,
                  paddingY: 1,
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Image
                    src="/payment/fps.png"
                    alt="fps"
                    width={90}
                    height={90}
                  />
                  <Typography variant="body2" fontWeight="bold">
                    FPS 轉數快
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    免手續費
                  </Typography>
                </Stack>
              </Box>
            }
            label=""
          />
          <FormControlLabel
            value="2"
            control={
              <Box
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
                  paddingX: 4,
                  paddingY: 1,
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Image
                    src="/payment/alipay.png"
                    alt="fps"
                    width={90}
                    height={90}
                  />
                  <Typography variant="body2" fontWeight="bold">
                    支付寶
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    2% 手續費
                  </Typography>
                </Stack>
              </Box>
            }
            label=""
          />
          <FormControlLabel
            value="3"
            control={
              <Box
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
                  paddingX: 4,
                  paddingY: 1,
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Image
                    src="/payment/payme.png"
                    alt="fps"
                    width={90}
                    height={90}
                  />
                  <Typography variant="body2" fontWeight="bold">
                    Payme
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    1.5% 手續費
                  </Typography>
                </Stack>
              </Box>
            }
            label=""
          />
          <FormControlLabel
            value="4"
            control={
              <Box
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
                  paddingX: 4,
                  paddingY: 1,
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Image
                    src="/payment/tapngo.jpg"
                    alt="fps"
                    width={90}
                    height={90}
                  />
                  <Typography variant="body2" fontWeight="bold">
                    Tap & Go
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    1.5% 手續費
                  </Typography>
                </Stack>
              </Box>
            }
            label=""
          />
          <FormControlLabel
            value="5"
            control={
              <Box
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
                  paddingX: 4,
                  paddingY: 1,
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Image
                    src="/payment/octopus.png"
                    alt="octopus"
                    width={90}
                    height={90}
                  />
                  <Typography variant="body2" fontWeight="bold">
                    八達通
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    1.5% 手續費
                  </Typography>
                </Stack>
              </Box>
            }
            label=""
          />
          <FormControlLabel
            value="6"
            control={
              <Box
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
                  paddingX: 4,
                  paddingY: 1,
                  marginTop: 1,
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Image
                    src="/payment/shop.png"
                    alt="cash"
                    width={90}
                    height={90}
                  />
                  <Typography variant="body2" fontWeight="bold">
                    門市現金付款
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    免手續費
                  </Typography>
                </Stack>
              </Box>
            }
            label=""
          />
        </RadioGroup>
      </Stack>
      <Typography variant="h6" borderBottom="1px solid #E0E0E0" p={1}>
        4 確認訂單
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Image
            src="/products/CPU/Intel/13th/i9.jpeg"
            alt="i9"
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={7}>
          <Stack direction="column">
            <Typography variant="body1" fontSize={15}>
              【i9-13900K】INTEL CORE i9-13900K 24Core 32Threads【盒裝/三年保】
            </Typography>
            <Typography variant="body1" fontSize={13}>
              Intel
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" color="error" fontWeight="bold">
            $4390.00
          </Typography>
        </Grid>
        <Grid item xs={1} paddingLeft={1}>
          <Stack direction="row" height={40}>
            <TextField
              size="small"
              value={1}
              inputProps={{
                min: 0,
                style: { textAlign: "center", paddingTop: 5, paddingBottom: 5 },
              }}
              sx={{ minWidth: 60, width: 60, minHeight: 33, height: 33 }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Image
            src="/products/【RTX4080】MSI RTX4080 GAMING X TRIO 16GB DISPLAY CARD.png"
            alt="rtx 3080"
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={7}>
          <Stack direction="column">
            <Typography variant="body1" fontSize={15}>
              【RTX4080】MSI RTX4080 GAMING X TRIO 16GB DISPLAY CARD
            </Typography>
            <Typography variant="body1" fontSize={13}>
              MSI
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" color="error" fontWeight="bold">
            $10250.00
          </Typography>
        </Grid>
        <Grid item xs={1} paddingLeft={1}>
          <Stack direction="row" height={40}>
            <TextField
              size="small"
              value={1}
              inputProps={{
                min: 0,
                style: { textAlign: "center", paddingTop: 5, paddingBottom: 5 },
              }}
              sx={{ minWidth: 60, width: 60, minHeight: 33, height: 33 }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Stack direction="column" spacing={1} marginRight={1} marginBottom={1}>
        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="body1" fontWeight="bold">
            貨品總額：
          </Typography>
          <Typography variant="body1" color="error" fontWeight="bold">
            $14,640.00
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="body1" fontWeight="bold">
            其他費用：
          </Typography>
          <Typography variant="body1" color="error" fontWeight="bold">
            $0.00
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="body1" fontWeight="bold">
            合計：
          </Typography>
          <Typography variant="body1" color="error" fontWeight="bold">
            $16,640.00
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained" color="info">
            確認訂單
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Checkout;
