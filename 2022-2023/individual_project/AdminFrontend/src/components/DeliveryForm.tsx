"use client";
import { Autocomplete, Button, Container, Checkbox, Stack, TextField } from "@/components/@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import Delivery from "@/interfaces/Delivery";
import dayjs from "dayjs";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useRouter } from "next/navigation";
import Box from "@/interfaces/Box";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface BoxOptionType {
  optionId: number;
  boxId: string;
}

interface SenderOptionType {
  optionId: number;
  senderName: string;
  address: string;
}

interface ReceiverOptionType {
  optionId: number;
  receiverName: string;
  address: string;
}

type DeliveryFormType = {
  type: string;
  delivery: Delivery;
  setDelivery?: Dispatch<SetStateAction<Delivery>>;
  submitting?: boolean;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleBack: () => void;
};

const DeliveryForm: React.FC<DeliveryFormType> = ({
  type,
  delivery,
  setDelivery,
  submitting,
  handleSubmit,
  handleBack,
}) => {
  const router = useRouter();

  const [boxIdOptions, setBoxIdOptions] = useState<BoxOptionType[]>([]);
  const [selectedBoxId, setSelectedBoxId] = useState<BoxOptionType[]>([]);

  const receiverOptions: ReceiverOptionType[] = [
    { optionId: 1, receiverName: "Supermarket A", address: "123 Main Street, Anytown" },
    { optionId: 2, receiverName: "Supermarket B", address: "456 Elm Street, Anycity" },
    { optionId: 3, receiverName: "Supermarket C", address: "789 Oak Street, Anyville" },
    { optionId: 4, receiverName: "Supermarket D", address: "1010 Pine Street, Anyborough" },
    { optionId: 5, receiverName: "Supermarket E", address: "1111 Maple Street, Anyham" },
  ];
  const [selectedReceiver, setSelectedReceiver] = useState<ReceiverOptionType | null>(null);

  const senderOptions: SenderOptionType[] = [
    { optionId: 1, senderName: "Supplier A", address: "123 Main Street, Anytown" },
    { optionId: 2, senderName: "Supplier B", address: "456 Elm Street, Anycity" },
    { optionId: 3, senderName: "Supplier C", address: "789 Oak Street, Anyville" },
    { optionId: 4, senderName: "Supplier D", address: "1010 Pine Street, Anyborough" },
    { optionId: 5, senderName: "Supplier E", address: "1111 Maple Street, Anyham" },
  ];
  const [selectedSender, setSelectedSender] = useState<SenderOptionType | null>(null);

  const fetchBoxId = async (supplier: string) => {
    const response = await fetch("/api/box");
    const data = await response.json();

    let optionId = 1;
    let updatedOption: BoxOptionType[] = [];

    data.forEach((box: Box) => {
      if (box.status === "Stored (Supplier)" && box.supplier === supplier && box.isCompliance) {
        updatedOption.push({ optionId: optionId, boxId: (String(box.boxId) || "") });
        optionId++; // increment optionId for each box that meets the condition
      }
    });
    setBoxIdOptions(updatedOption);
  };

  useEffect(() => {
    let boxesId: number[] = [];
    selectedBoxId.forEach((selected) => {
      boxesId.push(Number(selected.boxId));
    });
    setDelivery?.({ ...delivery, boxesId: boxesId });
  }, [selectedBoxId]);

  useEffect(() => {
    if (selectedSender !== null) {
      fetchBoxId(selectedSender.senderName);
      setDelivery?.({ ...delivery, sender: selectedSender.senderName, senderAddress: selectedSender.address });
    }
  }, [selectedSender]);

  useEffect(() => {
    if (selectedReceiver !== null) {
      setDelivery?.({
        ...delivery,
        receiver: selectedReceiver.receiverName,
        receiverAddress: selectedReceiver.address,
      });
    }
  }, [selectedReceiver]);

  const handleDeparture = async () => {
    const response = await fetch("/api/delivery/departure", {
      method: "POST",
      body: JSON.stringify({
        deliveryId: delivery.deliveryId,
        sendDatetime: dayjs().format("YYYY-MM-DD HH:mm"),
      }),
    });

    if (response.ok) {
      router.push("/delivery");
    }
  };

  const handleArrival = async () => {
    const response = await fetch("/api/delivery/arrival", {
      method: "POST",
      body: JSON.stringify({
        deliveryId: delivery.deliveryId,
        arrivalDatetime: dayjs().format("YYYY-MM-DD HH:mm"),
      }),
    });

    if (response.ok) {
      router.push("/delivery");
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
          {/* Delivery ID + Last Update */}
          {type !== "Create" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="delivery-id"
                label="Delivery ID"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                value={delivery.deliveryId}
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
                value={dayjs(delivery.lastUpdate).format("YYYY-MM-DD HH:mm")}
                fullWidth
              />
            </Stack>
          ) : (
            ""
          )}
          {/* Sender + Sender Address */}
          {type !== "Create" ? (
            <>
              <Stack direction="row" spacing={1}>
                <TextField
                  id="sender"
                  label="Sender"
                  variant="outlined"
                  value={delivery.sender}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: delivery.sender !== "null",
                  }}
                  fullWidth
                />
                <TextField
                  id="senderAddress"
                  label="Sender Address (Read Only)"
                  variant="outlined"
                  value={delivery?.senderAddress}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: delivery?.senderAddress !== null,
                  }}
                  fullWidth
                />
              </Stack>
            </>
          ) : (
            <>
              <Stack direction="row" spacing={1}>
                <Autocomplete
                  id="sender"
                  value={selectedSender}
                  options={senderOptions}
                  getOptionLabel={(option) => String(option.senderName)}
                  renderOption={(props, option) => {
                    return (
                      <li key={option.optionId} {...props}>
                        {option.senderName}
                      </li>
                    );
                  }}
                  renderInput={(params) => <TextField {...params} label="Sender" placeholder="Select Sender" />}
                  onChange={(e, value) => {
                    setSelectedSender(value);
                  }}
                  isOptionEqualToValue={(option, value) => option.optionId === value.optionId}
                  fullWidth
                />
              </Stack>
              <Stack direction="row" spacing={1}>
                <TextField
                  id="senderAddress"
                  label="Sender Address (Read Only)"
                  variant="outlined"
                  value={selectedSender?.address}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: selectedSender !== null,
                  }}
                  fullWidth
                />
              </Stack>
            </>
          )}
          {/* Box IDs */}
          {type !== "Create" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="boxesId"
                label="Box IDs"
                variant="outlined"
                value={delivery.boxesId}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <Autocomplete
                multiple
                id="boxesId"
                value={selectedBoxId}
                options={boxIdOptions}
                disableCloseOnSelect
                getOptionLabel={(option) => String(option.boxId)}
                renderOption={(props, option, { selected }) => {
                  return (
                    <li key={option.optionId} {...props}>
                      <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                      {option.boxId}
                    </li>
                  );
                }}
                renderInput={(params) => <TextField {...params} label="Box ID(s)" placeholder="Select Boxes" />}
                onChange={(e, value) => {
                  setSelectedBoxId(value);
                }}
                fullWidth
              />
            </Stack>
          )}
          {/* Truck License Plate */}
          <Stack direction="row" spacing={1}>
            <TextField
              id="truckLicensePlate"
              label="Truck License Plate"
              variant="outlined"
              value={delivery.truckLicensePlate}
              onChange={(e) => setDelivery?.({ ...delivery, truckLicensePlate: e.target.value })}
              InputProps={{
                readOnly: type !== "Create",
              }}
              fullWidth
            />
          </Stack>
          {/* Receiver + Receiver Address */}
          {type !== "Create" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="receiver"
                label="Receiver"
                value={delivery.receiver}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
              <TextField
                id="receiverAddress"
                label="Receiver Address"
                value={delivery.receiverAddress}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Stack>
          ) : (
            <>
              <Stack direction="row" spacing={1}>
                <Autocomplete
                  id="receiver"
                  value={selectedReceiver}
                  options={receiverOptions}
                  getOptionLabel={(option) => String(option.receiverName)}
                  renderOption={(props, option) => {
                    return (
                      <li key={option.optionId} {...props}>
                        {option.receiverName}
                      </li>
                    );
                  }}
                  renderInput={(params) => <TextField {...params} label="Receiver" placeholder="Select Receiver" />}
                  onChange={(e, value) => {
                    setSelectedReceiver(value);
                  }}
                  isOptionEqualToValue={(option, value) => option.optionId === value.optionId}
                  fullWidth
                />
              </Stack>
              <Stack direction="row" spacing={1}>
                <TextField
                  id="receiverAddress"
                  label="Receiver Address (Read Only)"
                  variant="outlined"
                  value={selectedReceiver?.address}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: selectedReceiver !== null,
                  }}
                  fullWidth
                />
              </Stack>
            </>
          )}
          {/* Estimated Departure Datetime + (View mode) Actual Departure Datetime */}
          {type !== "Create" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="estimatedDepartureDatetime"
                label="Estimated Departure Datetime"
                value={delivery.estimatedDepartureDatetime}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
              <TextField
                id="actualDepartureDatetime"
                label="Actual Departure Datetime"
                value={delivery.actualDepartureDatetime}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <DateTimePicker
                label="Estimated Departure Datetime"
                value={
                  delivery.estimatedDepartureDatetime !== "" ? dayjs(delivery.estimatedDepartureDatetime) : dayjs()
                }
                onChange={(newValue) =>
                  setDelivery?.({ ...delivery, estimatedDepartureDatetime: (newValue?.format("YYYY-MM-DD HH:mm") || "NA") })
                }
                ampm={false}
                sx={{ width: "100%" }}
              />
            </Stack>
          )}
          {/* Estimated Arrival Datetime + (View mode) Actual Arrival Datetime */}
          {type !== "Create" ? (
            <Stack direction="row" spacing={1}>
              <TextField
                id="estimatedArrivalDatetime"
                label="Estimated Arrival Datetime"
                value={delivery.estimatedArrivalDatetime}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
              <TextField
                id="actualArrivalDatetime"
                label="Actual Arrival Datetime"
                value={delivery.actualArrivalDatetime}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <DateTimePicker
                label="Estimated Arrival Datetime"
                value={delivery.estimatedArrivalDatetime !== "" ? dayjs(delivery.estimatedArrivalDatetime) : dayjs()}
                onChange={(newValue) =>
                  setDelivery?.({ ...delivery, estimatedArrivalDatetime: (newValue?.format("YYYY-MM-DD HH:mm") || "NA") })
                }
                ampm={false}
                sx={{ width: "100%" }}
              />
            </Stack>
          )}
          {/* Create Delivery Button (Display it if type is Create) */}
          {type === "Create" ? (
            <Stack direction="row-reverse">
              <Button type="submit" disabled={submitting} variant="contained" color="success">
                {submitting ? "Creating" : "Create"}
              </Button>
            </Stack>
          ) : (
            ""
          )}
          {/* Departure button (Display it if type is View and Actual Departure Datetime is NA) */}
          {type === "View" && delivery.actualDepartureDatetime === "NA" ? (
            <Stack direction="row-reverse" spacing={1}>
              <Button type="button" variant="contained" onClick={handleDeparture} color="success">
                Departure
              </Button>
            </Stack>
          ) : (
            ""
          )}
          {/* Arrival Button (Display it if type is View and Actual Departure Datetime IS NOT NA and Actual Arrival Datetime IS NA) */}
          {type === "View" && delivery.actualDepartureDatetime !== "NA" && delivery.actualArrivalDatetime === "NA" ? (
            <Stack direction="row-reverse" spacing={1}>
              <Button type="button" variant="contained" onClick={handleArrival} color="success">
                Arrival
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

export default DeliveryForm;
