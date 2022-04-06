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

export const EditParticipantsModal = connect(
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

  useEffect(() => {
    console.log(userList)
    Object.entries(userList).map((el: any) => {
      selectUser(el[0])
    })
  }, [])

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
        className={t.editButton}
        variant="text" 
        onClick={handleClickOpen}
        >
        <span className={s.editNameButton}>
            <svg
                // onClick={() => setEditDesc(true)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"
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
          {"Редактирование участников"}
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