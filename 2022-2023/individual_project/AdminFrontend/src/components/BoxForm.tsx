import { Autocomplete, Button, Container, InputAdornment, Stack, TextField } from "@/components/@mui/material";
import Box from "@/interfaces/Box";
import { DatePicker } from "@/components/@mui/x-date-pickers";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import BoxEventList from "./BoxEventList";
import { useRouter } from "next/navigation";

type BoxFormType = {
  type: string;
  box: Box;
  setBox?: Dispatch<SetStateAction<Box>>;
  submitting?: boolean;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleBack: () => void;
};

const BoxForm: React.FC<BoxFormType> = ({ type, box, setBox, submitting, handleSubmit, handleBack }) => {
  const router = useRouter();

  const [productName, setProductName] = useState<string>("");

  const [warehouse, setWarehouse] = useState<string>("");

  const [storagePeriodYear, setStoragePeriodYear] = useState<number>(1);
  const [storagePeriodMonth, setStoragePeriodMonth] = useState<number>(0);

  const [productionDate, setProductionDate] = useState<Dayjs>(dayjs());
  const [expirationDate, setExpirationDate] = useState<Dayjs>(
    productionDate.add(storagePeriodYear, "year").add(storagePeriodMonth, "month")
  );

  const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);
  const [currentHumidity, setCurrentHumidity] = useState<number | null>(null);

  const supplierList: {
    id: number;
    label: string;
  }[] = [
    { id: 1, label: "Supplier A" },
    { id: 2, label: "Supplier B" },
    { id: 3, label: "Supplier C" },
    { id: 4, label: "Supplier D" },
    { id: 5, label: "Supplier E" },
    { id: 6, label: "Supplier F" },
  ];

  const warehouseList: {
    id: number;
    label: string;
  }[] = [
    { id: 1, label: "Warehouse A" },
    { id: 2, label: "Warehouse B" },
    { id: 3, label: "Warehouse C" },
    { id: 4, label: "Warehouse D" },
    { id: 5, label: "Warehouse E" },
    { id: 6, label: "Warehouse F" },
  ];

  const handleStoragePeriodYearChange = (e) => {
    setStoragePeriodYear(e.target.value);
  };

  const handleStoragePeriodMonthChange = (e) => {
    setStoragePeriodMonth(e.target.value);
  };

  const fetchProduct = async () => {
    const response = await fetch(`/api/product/${box.productId}`);
    const data = await response.json();

    if (data.productNameZh === "") setProductName("NA");
    else setProductName(data.productNameZh);
  };

  const fetchCurrTempHumi = async () => {
    const response = await fetch(`/api/box/track-temp-humi/${box.boxId}`)
    const data = await response.json();

    console.log(data);

    if (data.temperature !== null) setCurrentTemperature(data.temperature);
    if (data.humidity !== null) setCurrentHumidity(data.humidity);
  };

  useEffect(() => {
    if (box.productId !== "") fetchProduct();
  }, [box.productId]);

  useEffect(() => {
    if (box.boxId !== 0) fetchCurrTempHumi();
  }, [box.boxId]);

  useEffect(() => {
    if (box.productionDate !== "") setProductionDate(dayjs(box.productionDate));
    if (box.expirationDate !== "") setExpirationDate(dayjs(box.expirationDate));
  }, [box.productionDate, box.expirationDate]);

  useEffect(() => {
    if (type === "Create") setBox?.({ ...box, expirationDate: dayjs(expirationDate).format("YYYY-MM-DD") });
  }, [expirationDate]);

  useEffect(() => {
    if (type === "Create") setBox?.({ ...box, productionDate: dayjs(productionDate).format("YYYY-MM-DD") });
  }, [productionDate]);

  useEffect(() => {
    if (type === "Create")
      setExpirationDate(dayjs(productionDate).add(storagePeriodYear, "year").add(storagePeriodMonth, "month"));
  }, [productionDate, storagePeriodYear, storagePeriodMonth]);

  const handleStoreBox = async () => {
    const response = await fetch("/api/box/supplier-store", {
      method: "POST",
      body: JSON.stringify({
        boxId: box.boxId,
        warehouse: warehouse,
      }),
    });

    if (response.ok) {
      router.push("/box");
    }
  };

  const handleSupermarketStoreBox = async () => {
    const response = await fetch("/api/box/supermarket-store", {
      method: "POST",
      body: JSON.stringify({
        boxId: box.boxId,
        warehouse: warehouse,
      }),
    });

    if (response.ok) {
      router.push("/box");
    }
  };

  const handleSupermarketHitBoxToTheStoreShelves = async () => {
    const response = await fetch("/api/box/hit-to-store-shelves", {
      method: "POST",
      body: JSON.stringify({
        boxId: box.boxId,
      }),
    });

    if (response.ok) {
      router.push("/box");
    }
  };

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
          {/* Box ID + Last update (Display these when type is View) */}
          {type === "View" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="box-id"
                label="box ID"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                value={box.boxId}
                fullWidth
              />
              <TextField
                id="lastUpdate"
                label="Last Update"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                value={dayjs(box.lastUpdate).format("YYYY-MM-DD HH:mm")}
                fullWidth
              />
            </Stack>
          ) : (
            ""
          )}
          {/* Product ID + Product Name */}
          <Stack direction="row" spacing={1}>
            <TextField
              id="productId"
              label="Product ID"
              variant="outlined"
              value={box.productId}
              onChange={(e) => setBox({ ...box, productId: Number(e.target.value) })}
              required
              InputProps={{
                readOnly: type !== "Create",
              }}
            />
            <TextField
              id="productName"
              label="Product Name"
              variant="outlined"
              value={productName}
              inputProps={{
                readOnly: true,
              }}
              error={productName === "NA"}
              fullWidth
            />
          </Stack>
          {/* Quantity + Weight + Value */}
          <Stack direction="row" spacing={1}>
            <TextField
              id="quantity"
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={box.quantity}
              onChange={(e) => setBox({ ...box, quantity: Number(e.target.value) })}
              required
              InputProps={{
                readOnly: type !== "Create",
              }}
              fullWidth
            />
            <TextField
              id="weight"
              label="Weight"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: type !== "Create",
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              variant="outlined"
              value={box.weight}
              onChange={(e) => setBox({ ...box, weight: Number(e.target.value) })}
              required
              fullWidth
            />
            <TextField
              id="value"
              label="Value"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: type !== "Create",
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              variant="outlined"
              value={box.value}
              onChange={(e) => setBox({ ...box, value: Number(e.target.value) })}
              required
              fullWidth
            />
          </Stack>
          {/* Box status (Display it when type is View) */}
          {type === "View" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="status"
                label="Status"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={box.status}
                required
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Stack>
          ) : (
            ""
          )}
          {/* Temperature + Humidity (Display it when type is View) */}
          {type === "View" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="temperature"
                label="Temperature"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={currentTemperature === null ? "---" : currentTemperature}
                InputProps={{
                  readOnly: true,
                  endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                }}
                fullWidth
              />
              <TextField
                id="humidity"
                label="Humidity"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={currentHumidity === null ? "---" : currentHumidity}
                InputProps={{
                  readOnly: true,
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                fullWidth
              />
            </Stack>
          ) : (
            ""
          )}
          {/* Is compliance (Display it when type is View) */}
          {type === "View" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="isCompliance"
                label="Is Compliance"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={box.isCompliance ? "Yes" : "No"}
                required
                InputProps={{
                  readOnly: true,
                }}
                error={!box.isCompliance}
                fullWidth
              />
            </Stack>
          ) : (
            ""
          )}
          {/* Production Date + Expiration Date */}
          <Stack direction="row" spacing={1}>
            <DatePicker
              label="Production Date"
              value={productionDate}
              format="YYYY-MM-DD"
              sx={{ width: "100%" }}
              slotProps={{
                textField: {
                  helperText: "YYYY-MM-DD (READ ONLY)",
                },
              }}
              readOnly
            />
            {type === "Create" ? (
              <TextField
                id="storagePeriodYear"
                label="Storage Period (Year)"
                type="number"
                variant="outlined"
                inputProps={{
                  min: 0,
                }}
                value={storagePeriodYear}
                onChange={handleStoragePeriodYearChange}
                fullWidth
              />
            ) : (
              ""
            )}
            {type === "Create" ? (
              <TextField
                id="storagePeriodYear"
                label="Storage Period (Month)"
                type="number"
                variant="outlined"
                inputProps={{
                  min: 0,
                }}
                value={storagePeriodMonth}
                onChange={handleStoragePeriodMonthChange}
                fullWidth
              />
            ) : (
              ""
            )}
            <DatePicker
              label="Expiration Date"
              value={expirationDate}
              format="YYYY-MM-DD"
              readOnly
              sx={{ width: "100%" }}
              slotProps={{
                textField: {
                  helperText: "YYYY-MM-DD (READ ONLY)",
                },
              }}
            />
          </Stack>
          {/* Supplier (Display it using Autocomplete when type is Create, otherwise using TextField) */}
          {type === "Create" ? (
            <Stack direction="row" spacing={1}>
              <Autocomplete
                disablePortal
                id="supplier"
                options={supplierList}
                renderInput={(params) => <TextField {...params} label="Supplier" value={box.supplier} />}
                onChange={(event: any, newValue: { id: number; label: string } | null) => {
                  setBox?.({ ...box, supplier: newValue?.label });
                }}
                readOnly={type !== "Create"}
                fullWidth
              />
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <TextField
                id="supplier"
                label="Supplier"
                value={box.supplier}
                inputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Stack>
          )}
          {/* Supermarket (Display it when type is View) */}
          {type === "View" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="supermarket"
                label="Supermarket"
                value={box.supermarket}
                inputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Stack>
          ) : (
            ""
          )}
          {/* Box location (Display it when type is View) */}
          {type === "View" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="location"
                label="Location"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                value={box.location}
                fullWidth
              />
            </Stack>
          ) : (
            ""
          )}
          {/* Create box button (Display it when type is Create) */}
          {type === "Create" ? (
            <Stack direction="row-reverse" spacing={1}>
              <Button type="submit" disabled={submitting} variant="contained" color="success">
                {submitting ? `${type}ing...` : type}
              </Button>
            </Stack>
          ) : (
            ""
          )}
          {/* Store to supplier warehouse button (Display it when box status is Pending To Store (Supplier)) */}
          {box.status === "Pending To Store (Supplier)" ? (
            <>
              <Stack direction="row">
                <Autocomplete
                  disablePortal
                  id="warehouse"
                  options={warehouseList}
                  renderInput={(params) => <TextField {...params} label="Warehouse" value={box.location} />}
                  onChange={(event: any, newValue: { id: number; label: string } | null) => {
                    setWarehouse?.(newValue !== null ? newValue.label : "Warehouse A");
                  }}
                  fullWidth
                />
              </Stack>
              <Stack direction="row-reverse" spacing={1}>
                <Button type="button" variant="contained" color="success" onClick={handleStoreBox}>
                  Store to Warehouse (Supplier)
                </Button>
              </Stack>
            </>
          ) : (
            ""
          )}
          {/* Store to supermarket warehouse button (Display it when box status is Arrival (Supermarket)) */}
          {box.status === "Arrival (Supermarket)" ? (
            <>
              <Stack direction="row">
                <Autocomplete
                  disablePortal
                  id="warehouse"
                  options={warehouseList}
                  renderInput={(params) => <TextField {...params} label="Warehouse" value={box.location} />}
                  onChange={(event: any, newValue: { id: number; label: string } | null) => {
                    setWarehouse?.(newValue !== null ? newValue.label : "Warehouse A");
                  }}
                  fullWidth
                />
              </Stack>
              <Stack direction="row-reverse" spacing={1}>
                <Button type="button" variant="contained" color="success" onClick={handleSupermarketStoreBox}>
                  Store to Warehouse (Supermarket)
                </Button>
              </Stack>
            </>
          ) : (
            ""
          )}
          {/* Hit to the store shelves button (Display it when box status is Stored (Supermarket)) */}
          {box.status === "Stored (Supermarket)" ? (
            <Stack direction="row-reverse">
              <Button
                type="button"
                variant="contained"
                color="success"
                onClick={handleSupermarketHitBoxToTheStoreShelves}
              >
                Hit to the store shelves (Supermarket)
              </Button>
            </Stack>
          ) : (
            ""
          )}
          {/* Events list (Display it when type is View) */}
          {type === "View" && box.boxId ? (
            <>
              <BoxEventList boxId={box.boxId} />
            </>
          ) : (
            ""
          )}
        </Stack>
      </Container>
    </form>
  );
};

export default BoxForm;
