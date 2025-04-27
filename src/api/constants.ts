export const apiUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_APP_API_URL_DEV
    : "";

export const REFRESH_INTERVAL = 1000 * 60 * 5; // 5 minutes
export const ORDER_REFRESH_INTERVAL = 1000 * 10; // 10 seconds

export const GET_ORDER_ERROR_MESSAGE = "Unable to get orders at this time";
export const GET_INSTRUMENT_ERROR_MESSAGE =
  "Unable to get instruments at this time";
export const DELETE_ORDER_ERROR_MESSAGE = "Unable to delete order";
export const DELETE_ORDERS_ERROR_MESSAGE =
  "Failed to delete one or more orders";
