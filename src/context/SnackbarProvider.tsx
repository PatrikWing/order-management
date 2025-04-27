import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";
import { useTheme } from "@mui/material/styles";

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={6000}
      style={{
        borderRadius: theme.shape.borderRadius,
      }}
    >
      {children}
    </NotistackSnackbarProvider>
  );
};
