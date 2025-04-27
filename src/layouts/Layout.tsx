import {
  Container,
  Box,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { Background } from "./components/Background";
import { BreadCrumbs } from "./components/BreadCrumbs";

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Background>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar>
            <BreadCrumbs />
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ flex: 1, p: 2 }}>
        <Container maxWidth={isMobile ? "sm" : "lg"} sx={{ pt: 10 }}>
          <Outlet />
        </Container>
      </Box>
    </Background>
  );
};

export default Layout;
