import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { DELETE_ORDERS_ERROR_MESSAGE } from "../constants";
import { QueryKeys } from "../enums";

export const useDeleteOrders = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const deleteOrders = useCallback(
    async (orderIds: number[]) => {
      let errorOccurred = false;
      await Promise.all(
        orderIds.map(async (orderId) => {
          try {
            const response = await fetch(`/api/orders/${orderId}`, {
              method: "DELETE",
            });
            if (!response.ok) {
              errorOccurred = true;
            }
            return response.json();
          } catch (error) {
            errorOccurred = true;
          }
        })
      );
      if (errorOccurred) {
        enqueueSnackbar(DELETE_ORDERS_ERROR_MESSAGE, {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar]
  );

  return useMutation({
    mutationFn: (orderIds: number[]) => deleteOrders(orderIds),
    onSuccess: () => {
      enqueueSnackbar("Orders deleted successfully", {
        variant: "success",
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] }),
  });
};
