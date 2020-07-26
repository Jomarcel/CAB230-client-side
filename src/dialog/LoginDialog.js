import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";

function LoginDialog({ showDialogCounter, setCounter }) {
  let history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (showDialogCounter === 2) {
      setOpen(true);
      setCounter(0);
    }
  }, [showDialogCounter, setCounter]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          You've reached the maximum logon attempts
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your compete QUT account email address (e.g.
            name@domain.com).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Try Again
          </Button>
          <Button
            onClick={() => {
              history.push("/signup");
            }}
            color="primary"
          >
            Signup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginDialog;

/* helper functions */

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

// {
//   /* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//     Open form dialog
//   </Button> */
// }
