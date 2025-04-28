import { Box } from "@mui/material";

export const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
      }}
    >
      {children}
    </Box>
  );
};
