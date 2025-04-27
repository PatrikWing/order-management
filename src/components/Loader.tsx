import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Fader from "./Fader";
import { Refresh } from "@mui/icons-material";

const Loader = ({
  loading,
  error,
  refetch,
  errorMessage,
}: {
  refetch?: () => void;
  loading?: boolean;
  error?: unknown | undefined;
  errorMessage?: string;
}) => {
  const isError = !!error;

  if (!loading && !isError) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ height: 400 }}>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {loading && (
          <Fader fadeDuration={1000}>
            <CircularProgress />
          </Fader>
        )}

        {isError && (
          <Fader fadeDuration={1000}>
            <>
              <ErrorOutlineIcon fontSize="large" />
              <Typography variant="body1">{errorMessage}</Typography>
              {isError && refetch && (
                <Button onClick={refetch} startIcon={<Refresh />}>
                  Try again
                </Button>
              )}
              {isError && !refetch && (
                <Button
                  startIcon={<Refresh />}
                  onClick={() => window.location.reload()}
                >
                  Refresh
                </Button>
              )}
            </>
          </Fader>
        )}
      </Box>
    </Container>
  );
};

export default Loader;
