import { useDispatch, useSelector } from "react-redux";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { RootState } from "@store/store.model";
import { closeSnackbar } from "@store/ui-reducer";
import { forwardRef } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

export default function SWSnackbar() {
  const dispatch = useDispatch();

  const { message, duration, severity, open } = useSelector(
    (state: RootState) => state.ui.snackbar
  );

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      autoHideDuration={duration}
      open={open}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity as any}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
