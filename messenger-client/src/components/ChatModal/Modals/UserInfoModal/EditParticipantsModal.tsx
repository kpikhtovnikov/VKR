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
import { exitChat, updateParticipantsGroup } from 'redux/reducers/chat';
import { connect } from 'react-redux';
import { Avatar, makeStyles } from "@material-ui/core";
import { SidebarSearch } from 'components/SidebarSearch/SidebarSearch';
import { searchType } from "constants/searchText";
import { useState } from 'react';
import { useEffect } from 'react';
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
  updateParticipants: (payload: any) => dispatch(updateParticipantsGroup(payload)),
  setUserSearch: (userSearch: any) => dispatch(setUserSearch(userSearch))
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
    chatState, 
    updateParticipants,
    setUserSearch
  }: any) => {
  
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [userList, setUserList] = useState(authUsers);
  const [textParticipants, setTextParticipants] = useState('')

  useEffect(() => {
    Object.entries(activeChat?.chatInfo?.participants)
      .filter(
        (_data: any) => _data[1].objectId != authState.auth.objectId
      )
      .map((_data: any) => {
        const data = authUsers[_data[1].objectId];
        console.log('data', data);
        selectUser(data.objectId)
      })
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setUserSearch('')
    setOpen(false);
  };

  const handleSaveModal = () => {
    let participants: any = [];
    let selectParticipants: any = [];
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
        selectParticipants.push({
          objectId: e[0],
          lastViewed: Date.now(),
        });
      }
    });

    if(selectParticipants.length > 0) {

    updateParticipants({
    'chatInfo': {
      _id: activeChat?.chatInfo?._id,
      name: activeChat?.chatInfo?.name,
      avatar: activeChat?.chatInfo?.avatar,
      createdOn: activeChat?.chatInfo?.createdOn,
      modifiedOn: activeChat?.chatInfo?.modifiedOn,
      participants,
      type: activeChat?.chatInfo?.type,
      desc: activeChat?.chatInfo?.desc,
    },
    'messages': activeChat.messages
    });
    setOpen(false);
    setUserSearch('')
    setTextParticipants('')
    } else {
      setTextParticipants('В чате должен быть минимум один участник!')
    }
  };

  const selectUser = (add: string) => {
    setTextParticipants('')
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

  return (
    <span>
      <Button 
        className={t.editButton}
        variant="text" 
        onClick={handleClickOpen}
        >
        <span className={s.editNameButton}>
            <svg
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
          {`Редактирование участников чата "${activeChat?.chatInfo?.name}"`}
        </DialogTitle>
        <DialogContent 
          className={classes.dialogContent}
        >
          <DialogContentText>
        <div className={s.sidebarModalBody}>
        <SidebarSearch typeSearch={searchType.userSearch}/>
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
            <div className={s.textParticipants}>{textParticipants}</div>
          </div>
          <p className={s.text}>Пользователи</p>
          <div className={s.chatsContainer}>
            {Object.entries(userList)
              .filter((e: any) => (e[1]?.selected ? false : true))
              .map((data: any) => {
                return (
                  (!chatState.userSearch.length || data[1].displayName.includes(chatState.userSearch)) ?
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
      </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.footerButtonsDisplay}>
            <Button className={classes.footerButtonSave} autoFocus onClick={handleSaveModal}>
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