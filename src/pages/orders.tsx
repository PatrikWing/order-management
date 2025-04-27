import { useGetOrders } from "../api/orders/useGetOrders";
import { useMemo, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  Toolbar,
} from "@mui/x-data-grid";
import { useGetInstruments } from "../api/instruments/useGetInstruments";
import { Instrument } from "../api/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Delete, Refresh, Visibility } from "@mui/icons-material";
import { useDeleteOrders } from "../api/orders/useDeleteOrders";

const Orders = () => {
  const [
    showDeleteOrderConfirmationDialog,
    setShowDeleteOrderConfirmationDialog,
  ] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    data: instruments,
    refetch: refetchInstruments,
    isRefetching: isRefetchingInstruments,
    isLoading: isLoadingInstruments,
  } = useGetInstruments();
  /**
   * Map to easily lookup instruments by id.
   */
  const instrumentsMap = useMemo(() => {
    return instruments?.items?.reduce((acc, instrument) => {
      acc[instrument.id] = instrument;
      return acc;
    }, {} as Record<number, Instrument>);
  }, [instruments]);

  const { data, isLoading, refetch, isRefetching } = useGetOrders();
  const { mutate: deleteOrders } = useDeleteOrders();

  const sortedOrders = useMemo(() => {
    try {
      //sort by updatedAt descending
      const sortedOrders = data?.items?.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });

      return sortedOrders ?? [];
    } catch (error) {
      return [];
    }
  }, [data]);

  const rows = useMemo(() => {
    return sortedOrders.map((order) => ({
      id: order.id,
      instrumentTicker: instrumentsMap?.[order.instrumentId]?.ticker,
      instrumentName: instrumentsMap?.[order.instrumentId]?.name,
      amount: order.amount,
      price: order.price,
      action: order.action,
      updatedAt: order.updatedAt
        ? new Date(order.updatedAt).toLocaleString()
        : "",
      createdAt: order.createdAt
        ? new Date(order.createdAt).toLocaleString()
        : "",
    }));
  }, [sortedOrders, instrumentsMap]);

  const ActionsCell = () => {
    return (
      <Tooltip title="View order">
        <IconButton onClick={() => alert("Not implemented")} color="info">
          <Visibility />
        </IconButton>
      </Tooltip>
    );
  };

  const desktopColumns: GridColDef[] = [
    { field: "instrumentTicker", headerName: "Ticker", flex: 1 },
    { field: "instrumentName", headerName: "Name", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "action", headerName: "Action", flex: 1 },
    { field: "updatedAt", headerName: "Updated at", flex: 1 },
    { field: "createdAt", headerName: "Created at", flex: 1 },
    //add a column for the actions
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ActionsCell,
    },
  ];

  const mobileColumns: GridColDef[] = [
    { field: "instrumentName", headerName: "Name", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ActionsCell,
    },
  ];

  const handleDeleteOrders = async () => {
    if (rowSelectionModel?.ids.size) {
      const orderIds = Array.from(rowSelectionModel.ids) as number[];
      await deleteOrders(orderIds);
      setShowDeleteOrderConfirmationDialog(false);
    }
  };

  const DeleteOrderConfirmationDialog = () => {
    return (
      <Dialog
        maxWidth="xs"
        open={showDeleteOrderConfirmationDialog}
        onClose={() => {
          setShowDeleteOrderConfirmationDialog(false);
        }}
      >
        <DialogTitle>Delete orders</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected orders? This action is
            irreversible.
          </DialogContentText>
          <DialogActions sx={{ gap: 2 }}>
            <Button
              onClick={() => {
                setShowDeleteOrderConfirmationDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              onClick={async () => await handleDeleteOrders()}
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  };

  const isGridLoading =
    isLoading ||
    isLoadingInstruments ||
    isRefetchingInstruments ||
    isRefetching;

  return (
    <>
      <DataGrid
        slots={{
          toolbar: () => (
            <Toolbar>
              <Tooltip title="Delete selected orders">
                <IconButton
                  color="error"
                  disabled={!rowSelectionModel?.ids.size}
                  onClick={() => {
                    setShowDeleteOrderConfirmationDialog(true);
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip title="Refresh orders">
                <IconButton
                  loading={isRefetchingInstruments || isRefetching}
                  onClick={async () => {
                    await refetchInstruments();
                    await refetch();
                  }}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Toolbar>
          ),
        }}
        showToolbar={true}
        checkboxSelection={true}
        sx={{
          height: "80vh",
        }}
        columns={isMobile ? mobileColumns : desktopColumns}
        rows={rows}
        loading={isGridLoading}
        localeText={{
          noRowsLabel: "No orders found",
        }}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={setRowSelectionModel}
      />
      <DeleteOrderConfirmationDialog />
    </>
  );
};

export default Orders;
