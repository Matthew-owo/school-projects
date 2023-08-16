import Product from "@/interfaces/Product";
import ProductsListOption from "@/interfaces/ProductsListOption";
import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, FormEvent, SetStateAction } from "react";

type SearchFormType = {
  productsList: ProductsListOption[];
  selectedProduct: ProductsListOption | null;
  setSelectedProduct: Dispatch<SetStateAction<ProductsListOption | null>>;
  pdExpSelect: string;
  setPdExpSelect: Dispatch<SetStateAction<string>>;
  datePicked: Dayjs | null;
  setDatePicked: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
  selectedSupermarket: string;
  setSelectedSupermarket: Dispatch<SetStateAction<string>>;
  submitting: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const SearchForm: React.FC<SearchFormType> = ({
  productsList,
  selectedProduct,
  setSelectedProduct,
  pdExpSelect,
  setPdExpSelect,
  datePicked,
  setDatePicked,
  selectedSupermarket,
  setSelectedSupermarket,
  submitting,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="xl">
        <Grid container>
          {/* Product Name Search */}
          <Grid item xs={12} py={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={productsList}
              value={selectedProduct}
              onChange={(event, value) => setSelectedProduct(value)}
              renderInput={(params) => <TextField {...params} label="Product Name" required />}
              isOptionEqualToValue={(option, value) => option === value}
              fullWidth
            />
          </Grid>
          {/* Select Production or Expiration Date to search + DatePicker */}
          <Grid item xs={6} py={2} paddingRight={1}>
            <FormControl fullWidth>
              <InputLabel id="pd-exp-selector-label">P.D. / EXP.</InputLabel>
              <Select
                labelId="pd-exp-selector-label"
                id="pd-exp-selector"
                label="P.D. / EXP."
                value={pdExpSelect}
                onChange={(e) => setPdExpSelect(e.target.value as string)}
                required
              >
                <MenuItem value="Production Date">Production Date</MenuItem>
                <MenuItem value="Expiration Date">Expiration Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} py={2} paddingLeft={1}>
            <DatePicker
              label={
                pdExpSelect !== ""
                  ? pdExpSelect
                  : "Please select search type..."
              }
              disabled={pdExpSelect === ""}
              sx={{
                width: "100%",
              }}
              value={datePicked}
              onChange={(value) => setDatePicked(value)}
            />
          </Grid>
          {/* Supermarket */}
          <Grid item xs={12} py={2}>
            <FormControl fullWidth>
              <InputLabel id="supermarket-selector-label">
                Supermarket
              </InputLabel>
              <Select
                labelId="supermarket-selector-label"
                id="supermarket-selector"
                label="Supermarket"
                value={selectedSupermarket}
                onChange={(e) => setSelectedSupermarket(e.target.value as string)}
                required
              >
                <MenuItem value="Supermarket A">Supermarket A</MenuItem>
                <MenuItem value="Supermarket B">Supermarket B</MenuItem>
                <MenuItem value="Supermarket C">Supermarket C</MenuItem>
                <MenuItem value="Supermarket D">Supermarket D</MenuItem>
                <MenuItem value="Supermarket E">Supermarket E</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Search Button */}
          <Grid item xs={12} py={2}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={submitting}
              sx={{
                fontSize: "18px",
              }}
              fullWidth
            >
              {submitting ? "Searching..." : "Search"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default SearchForm;
