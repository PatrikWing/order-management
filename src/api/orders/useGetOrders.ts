import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../enums";
import { useSnackbar } from "notistack";
import { OrdersResponse } from "../types";
import { GET_ORDER_ERROR_MESSAGE } from "../constants";
import { useCallback } from "react";

export const useGetOrders = () => {
  const { enqueueSnackbar } = useSnackbar();

  const getOrders = useCallback(async () => {
    try {
      const response = await fetch(`/api/orders`);
      if (!response.ok) {
        throw new Error(GET_ORDER_ERROR_MESSAGE);
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
      return [];
    }
  }, [enqueueSnackbar]);

  return useQuery<OrdersResponse, Error>({
    queryKey: [QueryKeys.Orders],
    queryFn: () => getOrders(),
    refetchOnWindowFocus: false,
  });
};
