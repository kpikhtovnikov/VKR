import * as React from 'react';
import s from "../../chatModal.module.scss";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { exitChat } from 'redux/reducers/chat';
import { connect } from 'react-redux';
import { CircularProgress } from "@material-ui/core";
import { Link } from 'react-router-dom';

const passStateToProps = ({ chatState, authState }: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
  myObjId: authState.auth.objectId,
});

const passDispatchToProps = (dispatch: any) => ({
  exitChatInfo: (payload: any) => dispatch(exitChat(payload)),
});

export const ExitModal = connect(
  passStateToProps,
  passDispatchToProps
)(({ activeChat, exitChatInfo, myObjId }: any) => {
  
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  // const loading = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleExitModal = () => {
    console.log(myObjId)
    const t = exitChatInfo({
      _id: myObjId,
      type: window.location,
      refId: activeChat.chatInfo._id,
      clientSide: activeChat.chatInfo.clientSide,
    });
    console.log(t)
    setOpen(false);
  };

  return (
    <p>
      {/* <CircularProgress size="50px" color="inherit" /> */}
      <Button 
        className={s.exitModal}
        variant="text" 
        onClick={handleClickOpen}
        >
        <IconButton className={s.exitModal} aria-label="delete" size="small">
          <ExitToAppIcon fontSize="inherit"/>
        </IconButton>
        <span className={s.MuiButtonLabel}>
          Выйти из чата
        </span>
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Выход из чата"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы действительно хотите выйти из чата?
          </DialogContentText>
        </DialogContent>
        {/* <CircularProgress size="50px" color="inherit" /> */}
        <DialogActions>
          <Button autoFocus onClick={handleExitModal}>
            Да
          </Button>
          <Button onClick={handleCloseModal} autoFocus>
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    </p>
  );
}
)