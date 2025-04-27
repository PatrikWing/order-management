import { Link, Typography } from "@mui/material";
import { Home, NavigateNext } from "@mui/icons-material";
import { Breadcrumbs } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { ReactNode } from "react";

// Define type for breadcrumb item
interface BreadcrumbItem {
  path: string;
  label: string;
  icon?: ReactNode;
}

export const BreadCrumbs = () => {
  const location = useLocation();
  // Create breadcrumb paths based on URL segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { path: "/", label: "Home", icon: <Home fontSize="small" /> },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return {
        path,
        label:
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      };
    }),
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return isLast ? (
          <Typography color="text.primary" key={item.path}>
            {item.icon ? item.icon : null}
            {item.icon ? " " : ""}
            {item.label}
          </Typography>
        ) : (
          <Link
            key={item.path}
            component={RouterLink}
            to={item.path}
            color="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {item.icon ? item.icon : null}
            {item.icon ? " " : ""}
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
