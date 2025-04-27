import { AppBar as MuiAppBar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const AppBar = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "rgba(15, 23, 42, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      {children}
    </MuiAppBar>
  );
};
