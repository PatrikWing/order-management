import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../enums";
import { useSnackbar } from "notistack";
import { OrdersResponse } from "../types";
import { GET_ORDER_ERROR_MESSAGE } from "../constants";
import { useCallback } from "react";

export const useGetOrders = (enabled: boolean = true) => {
  const { enqueueSnackbar } = useSnackbar();

  const getOrders = useCallback(async () => {
    const response = await fetch(`/api/orders`);
    if (!response.ok) {
      throw new Error(GET_ORDER_ERROR_MESSAGE);
    }
    return response.json();
  }, []);

  return useQuery<OrdersResponse, Error>({
    enabled,
    queryKey: [QueryKeys.Orders],
    queryFn: () => getOrders(),
    refetchOnWindowFocus: false,
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });
};
