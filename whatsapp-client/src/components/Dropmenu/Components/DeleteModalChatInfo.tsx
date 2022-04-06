import * as React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { deleteChat } from 'redux/reducers/chat';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    buttonDelete: {
      color: '#ffffff',
      textTransform: 'inherit',
      fontSize: '12px',
      padding: '0px 0px 0px 0px',
    }
  });

const passStateToProps = ({ chatState }: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
});

const passDispatchToProps = (dispatch: any) => ({
  deleteChatInfo: (payload: any) => dispatch(deleteChat(payload)),
});

export const DeleteModalChatInfo = connect(
  passStateToProps,
  passDispatchToProps
)(({ activeChat, deleteChatInfo }: any) => {
  
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();
  // const loading = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDeleteModal = () => {
    console.log(activeChat)
    const t = deleteChatInfo({
      _id: activeChat,
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
        className={classes.buttonDelete}
        variant="text" 
        onClick={handleClickOpen}
        >
          Удалить чат
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Удаление чата"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы действительно хотите удалить чат?
          </DialogContentText>
        </DialogContent>
        {/* <CircularProgress size="50px" color="inherit" /> */}
        <DialogActions>
          <Button autoFocus onClick={handleDeleteModal}>
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