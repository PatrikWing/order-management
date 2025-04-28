import { useCreateNewOrder } from "../api/orders/useCreateNewOrder";
import {
  SelectElement,
  TextFieldElement,
  useForm,
  useWatch,
} from "react-hook-form-mui";
import { useGetInstruments } from "../api/instruments/useGetInstruments";
import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { OrderActionType } from "../api/enums";
import { Refresh } from "@mui/icons-material";
import { useMemo } from "react";
import { CreateNewOrderInput } from "../api/types";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrders } from "../api/orders/useGetOrders";
import { useEditOrder } from "../api/orders/useEditOrder";

export const OrderForm = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const orderIdAsNr = orderId ? Number(orderId) : undefined;
  const isEditing = !!orderIdAsNr;
  const { data: orders, isLoading: isLoadingOrders } = useGetOrders(isEditing);
  const orderToEdit = useMemo(() => {
    return orders?.items?.find((order) => order.id === orderIdAsNr);
  }, [orders, orderIdAsNr]);

  const { control, handleSubmit } = useForm<CreateNewOrderInput>({
    defaultValues: {
      instrumentId: orderToEdit?.instrumentId,
      amount: orderToEdit?.amount,
      price: orderToEdit?.price,
      action: orderToEdit?.action,
    },
  });
  const amount = useWatch({ control, name: "amount" });
  const price = useWatch({ control, name: "price" });

  const { mutate: createNewOrder, isLoading: isCreatingNewOrder } =
    useCreateNewOrder();
  const { mutate: editOrder, isLoading: isEditingOrder } = useEditOrder();

  const {
    data: instruments,
    isRefetching: isRefetchingInstruments,
    refetch,
  } = useGetInstruments();

  const instrumentOptions = useMemo(() => {
    return instruments?.items?.map((instrument) => ({
      id: instrument.id,
      label: `${instrument.name} (${instrument.ticker})`,
    }));
  }, [instruments]);

  return (
    <Stack gap={2}>
      <Typography variant="h6">
        {isEditing ? "Update order" : "Create new order"}
      </Typography>
      <form
        onSubmit={handleSubmit((data) =>
          isEditing && orderToEdit
            ? editOrder({
                id: orderToEdit?.id,
                instrumentId: data.instrumentId,
                amount: data.amount,
                price: data.price,
                action: data.action,
              })
            : createNewOrder({
                instrumentId: data.instrumentId,
                amount: data.amount,
                price: data.price,
                action: data.action,
              })
        )}
      >
        <Stack gap={2}>
          <Stack direction="row" gap={2} alignItems="center">
            <SelectElement
              name="instrumentId"
              label="Instrument"
              required
              fullWidth
              options={instrumentOptions}
              helperText="Select the instrument you want to trade"
              control={control}
            />
            <Tooltip title="Refresh instrument data">
              <IconButton
                onClick={() => refetch()}
                loading={isRefetchingInstruments}
                disabled={isRefetchingInstruments}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
          </Stack>
          <TextFieldElement
            name="amount"
            label="Amount"
            required
            type="number"
            control={control}
            helperText="Units to trade"
            slotProps={{
              htmlInput: {
                min: 1,
                step: 1,
              },
            }}
          />
          <TextFieldElement
            name="price"
            label="Price"
            helperText="Price per unit"
            required
            type="number"
            control={control}
            slotProps={{
              htmlInput: {
                min: 0.01,
                step: 0.01,
              },
            }}
          />
          <SelectElement
            name="action"
            label="Action"
            required
            control={control}
            options={[
              { id: OrderActionType.Buy, label: "Buy" },
              { id: OrderActionType.Sell, label: "Sell" },
            ]}
          />
          <Stack gap={2}>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
              }}
            >
              {`Total trade amount: ${(
                (price ?? 0) * (amount ?? 0)
              ).toLocaleString()}`}
            </Typography>
            <Stack direction="row" gap={2} justifyContent="flex-end">
              <Button
                onClick={() => navigate("/orders")}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                loading={isCreatingNewOrder || isEditingOrder}
                disabled={
                  isCreatingNewOrder || isEditingOrder || isLoadingOrders
                }
              >
                {isEditing ? "Update" : "Create"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};
