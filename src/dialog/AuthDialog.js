import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";

function AuthDialog(props) {
  let history = useHistory();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  //   useEffect(() => {
  //     if (showDialogCounter === 2) {
  //       setOpen(true);
  //       setCounter(0);
  //     }
  //   }, [showDialogCounter]);

  return (
    console.log(props),
    (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Listing accessbility is for authenticated users only
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please login or create an account to continue.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
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
    )
  );
}

export default AuthDialog;

/* helper functions */

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

{
  /* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
    Open form dialog
  </Button> */
}
