import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import {
  DELETE_ORDERS_ERROR_MESSAGE,
  DELETE_ORDERS_SUCCESS_MESSAGE,
} from "../constants";
import { QueryKeys } from "../enums";

export const useDeleteOrders = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const deleteOrders = useCallback(async (orderIds: number[]) => {
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
      throw new Error(DELETE_ORDERS_ERROR_MESSAGE);
    }
  }, []);

  return useMutation({
    mutationFn: deleteOrders,
    onSuccess: () => {
      enqueueSnackbar(DELETE_ORDERS_SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] }),
  });
};
