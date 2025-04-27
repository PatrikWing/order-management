import { RouterProvider } from "react-router-dom";
import router from "./pages/router";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./theme";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { SnackbarProvider } from "./context/SnackbarProvider";

/**
 * Theming
 */
const theme = createTheme({
  ...(darkTheme as ThemeOptions),
});

/**
 * Query Client
 */
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
