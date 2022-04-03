import * as React from 'react';
import t from "../../chatModal.module.scss";
import s from "../../../SidebarModal/sidebarModal.module.scss";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { createNewGroup, exitChat } from 'redux/reducers/chat';
import { connect } from 'react-redux';
import { Avatar, makeStyles } from "@material-ui/core";
import { SidebarSearch } from 'components/SidebarSearch/SidebarSearch';
import { searchType } from "constants/searchText";
import { useState } from 'react';
import { ObjectID } from "bson";
import { newGroupIcon } from 'components/SidebarModal/Modals/newGroupIcon';
import { useEffect } from 'react';

const useStyles = makeStyles({
  dialogContent: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(71, 71, 71)'
    },
    padding: '0px 0px'
  },
  footerButtonsDisplay: {
    display: 'flex',
    'justify-content': 'center',
  },
  footerButtonSave: {
    color: '#1c79db',
  },
  footerButtonCancel: {
    color: '#8d2c2c',
  },
  addButton: {
    padding: '6px 3px',
    minWidth: '0px'
  }
});

const passStateToProps = ({ chatState, authState }: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
  myObjId: authState.auth.objectId,
  authUsers: chatState.authUsers,
  authState,
  chatState
});

const passDispatchToProps = (dispatch: any) => ({
  exitChatInfo: (payload: any) => dispatch(exitChat(payload)),
  createNewGroupStart: (payload: any) => dispatch(createNewGroup(payload)),
});

export const AddChatModal = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({ 
    activeChat, 
    exitChatInfo, 
    myObjId, 
    authUsers, 
    authState, 
    createNewGroupStart,
    chatState, 
  }: any) => {
  
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [userList, setUserList] = useState(authUsers);
  const [grpName, setGrpName] = useState("");

  const otherFriend =
    activeChat?.chatInfo?.type === "chat"
      ? activeChat?.chatInfo?.participants.find((e: any) => {
          console.log(e);
          return e.objectId !== myObjId;
        })
      : null;

//   useEffect(() => {
//     console.log(userList)
//     Object.entries(userList).map((el: any) => {
//       selectUser(el[0])
//     })
//   }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleExitModal = () => {
    console.log(myObjId)
    // const t = exitChatInfo({
    //   _id: myObjId,
    //   type: window.location,
    //   refId: activeChat.chatInfo._id,
    //   clientSide: activeChat.chatInfo.clientSide,
    // });
    // console.log(t)
    
    setOpen(false);
  };

  const selectUser = (add: string) => {
    setUserList((prev: any) => ({
      ...prev,
      [add]: {
        ...prev[add],
        selected: true,
      },
    }));
  };

  const unselectUser = (remove: string) => {
    setUserList((prev: any) => ({
      ...prev,
      [remove]: {
        ...prev[remove],
        selected: false,
      },
    }));
  };

  const createNewGroup = ({}: any) => {
    if (grpName.length <= 1) return;
    const participants: any = [];
    participants.push({
      objectId: authState.auth.objectId,
      lastViewed: Date.now(),
    });
    Object.entries(userList).forEach((e: any) => {
      if (e[1].selected) {
        participants.push({
          objectId: e[0],
          lastViewed: Date.now(),
        });
      }
    });
    createNewGroupStart({
      _id: new ObjectID().toString(),
      name: grpName,
      avatar: newGroupIcon,
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      participants,
      type: "group",
      desc: `Чат создал ${authState.auth.displayName}`,
    });
    // console.log(closeModal)
    // closeModal();
  };

  return (
    <span>
      {/* <CircularProgress size="50px" color="inherit" /> */}
      <Button 
        // className={t.editButton}
        className={classes.addButton}
        variant="text" 
        onClick={handleClickOpen}
        >
        <span className={s.addChatButton}>
            <svg
              viewBox="0 0 30 30"
              width="35"
              height="35"
              className={s.avatar}
            >
              <path
                fill="currentColor"
                d="M15.313 15.672c2.401 0 4.237-1.835 4.237-4.235S17.713 7.2 15.313 7.2s-4.235 1.836-4.235 4.237 1.834 4.235 4.235 4.235zm9.349-.64c1.571 0 2.773-1.201 2.773-2.772 0-1.571-1.202-2.773-2.773-2.773s-2.772 1.202-2.772 2.773c0 1.571 1.201 2.772 2.772 2.772zm-1.724 5.841a7.856 7.856 0 0 0-.889-1.107 8.074 8.074 0 0 0-1.825-1.413 9.05 9.05 0 0 0-.675-.346l-.021-.009c-1.107-.502-2.5-.851-4.232-.851-1.732 0-3.124.349-4.232.851l-.112.054a9.247 9.247 0 0 0-.705.374 8.137 8.137 0 0 0-1.705 1.341 7.991 7.991 0 0 0-.656.773 8.584 8.584 0 0 0-.233.334c-.063.095-.116.184-.164.263l-.012.02a4.495 4.495 0 0 0-.213.408v2.276h16.061v-2.276s-.07-.164-.225-.427a4.257 4.257 0 0 0-.162-.265zm1.724-4.357c-1.333 0-2.376.3-3.179.713a9.409 9.409 0 0 1 1.733 1.218c1.402 1.25 1.959 2.503 2.017 2.641l.021.049h4.954v-1.571s-1.294-3.05-5.546-3.05zM9.41 13.78H6.261v-3.152H4.344v3.152H1.2v1.918h3.144v3.145h1.917v-3.145H9.41V13.78z"
              ></path>
            </svg>
        </span>
      </Button>
      <div className={s.MuiPaperRoot}>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            background: '#2a2f32',
            color: 'white',
            fontSize: '12px',
            width: '40%',
            overflowY: 'hidden',
          }
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Создание чата"}
        </DialogTitle>
        <DialogContent 
          className={classes.dialogContent}
        >
          <DialogContentText>
        <div className={s.sidebarModalBody}>
        {/* <div className={`${s.allChats} ${s.adduserstog}`}> */}
        <SidebarSearch typeSearch={searchType.newUserSearch}/>
          <div className={s.newGroupInfo}>
            <div className={s.addedUserInfo}>
              <div className={s.selectedUserDiv}>
                {Object.entries(userList)
                  .filter((e: any) => (!e[1]?.selected ? false : true))
                  .map((data: any) => {
                    return (
                      <div key={data[0]} className={s.selectedUserChip}>
                        <img src={data[1].avatar} alt={data[1].displayName} />
                        <small className={s.displayName}>{data[1].displayName}</small>
                        <svg
                          onClick={() => unselectUser(data[0])}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className={s.unselectIcon}
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                      </div>
                    );
                  })}
              </div>
            </div>
            <input
              value={grpName}
              onChange={(e: any) => setGrpName(e.target.value)}
              maxLength={30}
              placeholder="Название чата"
              type="text"
            />
          </div>
          <p className={s.text}>Пользователи</p>
          {/* Хардкод, чтобы протестить запрос */}
          {/* <button onClick={createNewGroup} >
            Создать
          </button> */}
          <div className={s.chatsContainer}>
            {Object.entries(userList)
              .filter((e: any) => (e[1]?.selected ? false : true))
              .map((data: any) => {
                return (
                  (!chatState.newUserSearch.length || data[1].displayName.includes(chatState.newUserSearch)) ?
                  (<div
                    //   onClick={() => handleOnClick(data)}
                    className={s.availableUsers}
                    key={data[0]}
                    onClick={() => selectUser(data[0])}
                  >
                    <div className={s.avatar}>
                      <div
                        className={`
                        ${s.activeStatus} ${
                          data[1]?.status
                            ? s.activeIndicater
                            : s.inactiveIndicater
                        }`}
                      ></div>
                      <Avatar src={data[1].avatar} alt="sidebar-chat-avatar" />
                    </div>
                    <span>
                      <p className={s.displayName}>{data[1].displayName}</p>
                      <small>{data[1].about}</small>
                    </span>
                  </div>
                  ): null
                );
              })}
          </div>
          <button onClick={createNewGroup} className={s.createGrpButton}>
            Создать
          </button>
        {/* </div> */}
      </div>
          </DialogContentText>
        </DialogContent>
        {/* <CircularProgress size="50px" color="inherit" /> */}
        <DialogActions className={classes.footerButtonsDisplay}>
            <Button className={classes.footerButtonSave} autoFocus onClick={handleExitModal}>
              Сохранить
            </Button>
            <Button className={classes.footerButtonCancel} onClick={handleCloseModal} autoFocus>
              Отменить
            </Button>
        </DialogActions>
      </Dialog>
      </div>
    </span>
  );
}
)