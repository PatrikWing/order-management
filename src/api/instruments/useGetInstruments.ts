import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../enums";
import { useSnackbar } from "notistack";
import { InstrumentsResponse } from "../types";
import { GET_INSTRUMENT_ERROR_MESSAGE } from "../constants";
import { useCallback } from "react";

export const useGetInstruments = () => {
  const { enqueueSnackbar } = useSnackbar();

  const getInstruments = useCallback(async () => {
    const response = await fetch(`/api/instruments`);
    if (!response.ok) {
      throw new Error(GET_INSTRUMENT_ERROR_MESSAGE);
    }
    return response.json();
  }, []);

  return useQuery<InstrumentsResponse, Error>({
    queryKey: [QueryKeys.Instruments],
    queryFn: () => getInstruments(),
    refetchOnWindowFocus: false,
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });
};
