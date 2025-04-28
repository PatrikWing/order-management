import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
  CREATE_NEW_ORDER_ERROR_MESSAGE,
  CREATE_NEW_ORDER_SUCCESS_MESSAGE,
} from "../constants";
import { CreateNewOrderInput } from "../types";
import { useCallback } from "react";
import { QueryKeys } from "../enums";
import { useNavigate } from "react-router-dom";

export const useCreateNewOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const createNewOrder = useCallback(async (order: CreateNewOrderInput) => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(CREATE_NEW_ORDER_ERROR_MESSAGE);
    }
    return response.json();
  }, []);

  return useMutation({
    mutationFn: createNewOrder,
    onSuccess: () => {
      enqueueSnackbar(CREATE_NEW_ORDER_SUCCESS_MESSAGE, {
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
