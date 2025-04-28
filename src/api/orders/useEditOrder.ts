import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
  EDIT_ORDER_ERROR_MESSAGE,
  EDIT_ORDER_SUCCESS_MESSAGE,
} from "../constants";
import { EditOrderInput } from "../types";
import { useCallback } from "react";
import { QueryKeys } from "../enums";
import { useNavigate } from "react-router-dom";

export const useEditOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const editOrder = useCallback(async (order: EditOrderInput) => {
    const response = await fetch(`/api/orders/${order.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(EDIT_ORDER_ERROR_MESSAGE);
    }
    return response.json();
  }, []);

  return useMutation({
    mutationFn: editOrder,
    onSuccess: () => {
      enqueueSnackbar(EDIT_ORDER_SUCCESS_MESSAGE, {
        variant: "success",
      });
      navigate("/orders");
    },
    onError: (error) => {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] });
    },
  });
};
