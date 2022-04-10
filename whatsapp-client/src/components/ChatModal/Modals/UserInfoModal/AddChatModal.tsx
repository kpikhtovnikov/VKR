import * as React from 'react';
import s from "../../../SidebarModal/sidebarModal.module.scss";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { createNewChat, createNewGroup, exitChat, setActiveChat } from 'redux/reducers/chat';
import { connect } from 'react-redux';
import { Avatar, makeStyles } from "@material-ui/core";
import { SidebarSearch } from 'components/SidebarSearch/SidebarSearch';
import { searchType } from "constants/searchText";
import { useState } from 'react';
import { ObjectID } from "bson";
import { newGroupIcon } from 'components/SidebarModal/Modals/newGroupIcon';
import { CreateChatGroup } from './CreateChatGroup';
import { setUserSearch } from "redux/reducers/chat";

const useStyles = makeStyles({
  dialogContent: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(71, 71, 71)'
    },
    padding: '0px 0px',
    backgroundColor: 'rgba(29, 35, 37, 0.726)'
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
  chatState,
  chats: chatState.chat
});

const passDispatchToProps = (dispatch: any) => ({
  exitChatInfo: (payload: any) => dispatch(exitChat(payload)),
  createNewGroupStart: (payload: any) => dispatch(createNewGroup(payload)),
  setActiveChat: (activeChat: any) => dispatch(setActiveChat(activeChat)),
  setUserSearch: (userSearch: any) => dispatch(setUserSearch(userSearch))
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
    chats,
    setActiveChat,
    setUserSearch
  }: any) => {
  
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [userList, setUserList] = useState(authUsers);
  const [grpName, setGrpName] = useState("");
  const [chatGroup, setChatGroup] = useState(false)
  const actualUserList = (value: any) => {
    setUserList(value)
  }
  const actualGrpName = (value: any) => {
    setGrpName(value)
  }
  // useEffect(()=> {
  //   setUserList(authState)
  // }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setChatGroup(false);
    setUserSearch('')
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

  const handleSaveModal = () => {
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
    setOpen(false);
    setUserSearch('')
  };

  const handleOnClick = (data: any) => {
    const doesChatExist: any = Object.entries(chats).find((chat: any) => {
      const refChat = chat[1].chatInfo;
      const bool1 = refChat.participants.find(
        (user: any) => user.objectId === data[0]
      );
      const bool2 = refChat.type === "chat";
      return bool1 && bool2;
    });

    handleCloseModal();
    setUserSearch('')

    if (doesChatExist) {
      setActiveChat({
        prevActiveChat: {
          prevActiveChatId: activeChat?.chatInfo._id,
          prevActiveChatType: activeChat?.chatInfo.type,
        },
        switchTo: doesChatExist[1].chatInfo._id,
      });
    } else {
      createNewChat({
        participants: [
          {
            lastViewed: null,
            objectId: data[0],
          },
          {
            lastViewed: Date.now(),
            objectId: authState.auth.objectId,
          },
        ],
        type: "chat",
        modifiedOn: Date.now(),
      });
    }
  };

  const newChat = () => {
    setUserSearch('')
    setChatGroup(true)
  }

  return (
    <p>
      <Button 
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
        {!chatGroup ?
        (<div className={s.sidebarModalBody}>
        <SidebarSearch typeSearch={searchType.userSearch}/>
        <div className={s.allChats}>
          <div
            onClick={() => {
              setChatGroup(true)
            }}
            className={s.newGroup}
          >
            <svg
              viewBox="0 0 32 32"
              width="32"
              height="32"
              className={s.avatar}
            >
              <path
                fill="currentColor"
                d="M15.313 15.672c2.401 0 4.237-1.835 4.237-4.235S17.713 7.2 15.313 7.2s-4.235 1.836-4.235 4.237 1.834 4.235 4.235 4.235zm9.349-.64c1.571 0 2.773-1.201 2.773-2.772 0-1.571-1.202-2.773-2.773-2.773s-2.772 1.202-2.772 2.773c0 1.571 1.201 2.772 2.772 2.772zm-1.724 5.841a7.856 7.856 0 0 0-.889-1.107 8.074 8.074 0 0 0-1.825-1.413 9.05 9.05 0 0 0-.675-.346l-.021-.009c-1.107-.502-2.5-.851-4.232-.851-1.732 0-3.124.349-4.232.851l-.112.054a9.247 9.247 0 0 0-.705.374 8.137 8.137 0 0 0-1.705 1.341 7.991 7.991 0 0 0-.656.773 8.584 8.584 0 0 0-.233.334c-.063.095-.116.184-.164.263l-.012.02a4.495 4.495 0 0 0-.213.408v2.276h16.061v-2.276s-.07-.164-.225-.427a4.257 4.257 0 0 0-.162-.265zm1.724-4.357c-1.333 0-2.376.3-3.179.713a9.409 9.409 0 0 1 1.733 1.218c1.402 1.25 1.959 2.503 2.017 2.641l.021.049h4.954v-1.571s-1.294-3.05-5.546-3.05zM9.41 13.78H6.261v-3.152H4.344v3.152H1.2v1.918h3.144v3.145h1.917v-3.145H9.41V13.78z"
              ></path>
            </svg>
            <div className={s.newG}>
              <p>Новый чат</p>
            </div>
          </div>
          <p className={s.text}>Пользователи</p>
          <div className={s.chatsContainer}>
            {Object.entries(authUsers).map((data: any) => {
              return (
                <div>
                { !chatState.userSearch.length || data[1].displayName.includes(chatState.userSearch) ?
                <div
                  onClick={() => handleOnClick(data)}
                  className={s.availableUsers}
                  key={data[0]}
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
                : null
                }
                </div>
              );
            })}
          </div>
        </div>
      </div>): (
        <CreateChatGroup actualUserList={actualUserList} actualGrpName={actualGrpName} />
      )}
        </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.footerButtonsDisplay}>
            {chatGroup? <Button className={classes.footerButtonSave} autoFocus onClick={handleSaveModal}>
              Сохранить
            </Button> : null}
            <Button className={classes.footerButtonCancel} onClick={handleCloseModal} autoFocus>
              {chatGroup ? 'Отменить' : 'Закрыть'}
            </Button>
        </DialogActions>
      </Dialog>
    </p>
  );
}
)