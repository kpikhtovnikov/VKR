// import { useEffect, useState } from "react";
// import { Modal } from 'react-bootstrap';
// import { render } from "react-dom";
// import Button from 'react-bootstrap/Button';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// export function DeleteModal() {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

// return (
//     <>
//         <Button variant="primary" onClick={handleShow}>
//             Launch demo modal
//         </Button>
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//             <Modal.Title>Modal heading</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//             <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//                 Close
//             </Button>
//             <Button variant="primary" onClick={handleClose}>
//                 Save Changes
//             </Button>
//             </Modal.Footer>
//         </Modal>
//     </>
//   );
// }

import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export function DeleteModal() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
