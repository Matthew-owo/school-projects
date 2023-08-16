import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@/components/@mui/material";
import Product from "@/interfaces/Product";
import { Dispatch, FormEvent, SetStateAction } from "react";

type ProductFormType = {
  type: string;
  product: Product;
  setProduct?: Dispatch<SetStateAction<Product>>;
  submitting?: boolean;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleBack: () => void;
};

const ProductForm: React.FC<ProductFormType> = ({
  type,
  product,
  setProduct,
  submitting,
  handleSubmit,
  handleBack,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="xl">
        <Stack direction="column" spacing={3} margin={2}>
          {/* Back button */}
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="secondary" onClick={handleBack}>
              Back
            </Button>
          </Stack>
          {/* Product ID + Last update (Display it when type is View) */}
          {type === "View" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="product-id"
                label="Product ID"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={product.productId}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
              <TextField
                id="lastUpdate"
                label="Last Update"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={product.lastUpdate}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Stack>
          ) : (
            ""
          )}
          {/* Product Chinese Name + English Name */}
          <Stack direction="row" spacing={1}>
            <TextField
              id="product-name-zh"
              label="Product Name (Chinese)"
              variant="outlined"
              value={product.productNameZh}
              onChange={(e) => setProduct?.({ ...product, productNameZh: e.target.value })}
              required
              InputProps={{
                readOnly: type !== "Create",
              }}
              fullWidth
            />
            <TextField
              id="product-name-en"
              label="Product Name (English)"
              variant="outlined"
              value={product.productNameEn}
              onChange={(e) => setProduct?.({ ...product, productNameEn: e.target.value })}
              required
              InputProps={{
                readOnly: type !== "Create",
              }}
              fullWidth
            />
          </Stack>
          {/* Product Type (Display it using Select when type is Create, otherwise using TextField) */}
          {type === "Create" ? (
            <Stack direction="row" spacing={1}>
              <FormControl fullWidth>
                <InputLabel id="productTypeLabel">Product Type</InputLabel>
                <Select
                  labelId="productTypeLabel"
                  id="productType"
                  value={product.productType}
                  label="Product Type"
                  onChange={(event: SelectChangeEvent<string>) =>
                    setProduct?.({ ...product, productType: event.target.value as string })
                  }
                >
                  <MenuItem value="Drinks">飲品 / Drinks</MenuItem>
                  <MenuItem value="Vegetables">蔬菜 / Vegetables</MenuItem>
                  <MenuItem value="Fruits">水果 / Fruits</MenuItem>
                  <MenuItem value="Frozen Food">急凍食品 / Frozen Food</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          ) : (
            <TextField
              id="productType"
              label="Product Type"
              value={product.productType}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          )}
          {/* Manufacturer Chinese Name + English Name */}
          <Stack direction="row" spacing={1}>
            <TextField
              id="manufacturer-name-zh"
              label="Manufacturer Name (Chinese)"
              variant="outlined"
              value={product.manufacturerNameZh}
              onChange={(e) => setProduct?.({ ...product, manufacturerNameZh: e.target.value })}
              required
              InputProps={{
                readOnly: type !== "Create",
              }}
              fullWidth
            />
            <TextField
              id="manufacturer-name-en"
              label="Manufacturer Name (English)"
              variant="outlined"
              value={product.manufacturerNameEn}
              onChange={(e) => setProduct?.({ ...product, manufacturerNameEn: e.target.value })}
              required
              InputProps={{
                readOnly: type !== "Create",
              }}
              fullWidth
            />
          </Stack>
          {/* Recommended temperature */}
          <Stack direction="row" spacing={1}>
            <TextField
              id="recommended-temperature"
              label="Recommended Storage Temperature"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                readOnly: type !== "Create",
              }}
              variant="outlined"
              value={product.recommendedTemperature}
              onChange={(e) => setProduct?.({ ...product, recommendedTemperature: Number(e.target.value) })}
              required
              fullWidth
            />
          </Stack>
          {/* Required temperature lower + upper */}
          <Stack direction="row" spacing={1}>
            <TextField
              id="required-temperature-lower"
              label="Required Storage Temperature Lower"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                readOnly: type !== "Create",
              }}
              variant="outlined"
              value={product.requiredTemperatureLower}
              onChange={(e) => setProduct?.({ ...product, requiredTemperatureLower: Number(e.target.value) })}
              required
              fullWidth
            />
            <TextField
              id="required-temperature-upper"
              label="Required Storage Temperature Upper"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                readOnly: type !== "Create",
              }}
              variant="outlined"
              value={product.requiredTemperatureUpper}
              onChange={(e) => setProduct?.({ ...product, requiredTemperatureUpper: Number(e.target.value) })}
              required
              fullWidth
            />
          </Stack>
          {/* Recommended humidity */}
          <Stack direction="row" spacing={1}>
            <TextField
              id="recommended-humidity"
              label="Recommended Storage Humidity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                readOnly: type !== "Create",
              }}
              variant="outlined"
              value={product.recommendedHumidity}
              onChange={(e) => setProduct?.({ ...product, recommendedHumidity: Number(e.target.value) })}
              required
              fullWidth
            />
          </Stack>
          {/* Required humidity lower + upper */}
          <Stack direction="row" spacing={1}>
            <TextField
              id="required-humidity-lower"
              label="Required Storage Humidity Lower"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                readOnly: type !== "Create",
              }}
              variant="outlined"
              value={product.requiredHumidityLower}
              onChange={(e) => setProduct?.({ ...product, requiredHumidityLower: Number(e.target.value) })}
              required
              fullWidth
            />
            <TextField
              id="required-humidity-upper"
              label="Required Storage Humidity Upper"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                readOnly: type !== "Create",
              }}
              variant="outlined"
              value={product.requiredHumidityUpper}
              onChange={(e) => setProduct?.({ ...product, requiredHumidityUpper: Number(e.target.value) })}
              required
              fullWidth
            />
          </Stack>
          {/* Create product button (Display it when type is Create) */}
          {type === "Create" ? (
            <Stack direction="row-reverse" spacing={1}>
              <Button type="submit" disabled={submitting} variant="contained" color="success">
                {submitting ? `${type}ing...` : type}
              </Button>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      </Container>
    </form>
  );
};

export default ProductForm;
