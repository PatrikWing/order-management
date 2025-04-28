import { Container, Toolbar, useTheme, useMediaQuery } from "@mui/material";
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
      <Container
        maxWidth={isMobile ? "sm" : "lg"}
        sx={{ pt: 10, pb: 2, height: "100%" }}
      >
        <Outlet />
      </Container>
    </Background>
  );
};

export default Layout;
