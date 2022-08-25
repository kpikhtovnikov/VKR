import * as React from 'react';
import s from "../../../SidebarModal/sidebarModal.module.scss";
import { createNewGroup, exitChat } from 'redux/reducers/chat';
import { connect } from 'react-redux';
import { Avatar } from "@material-ui/core";
import { SidebarSearch } from 'components/SidebarSearch/SidebarSearch';
import { searchType } from "constants/searchText";
import { useState } from 'react';
import { useEffect } from 'react';

const passStateToProps = ({ chatState, authState }: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
  myObjId: authState.auth.objectId,
  authUsers: chatState.authUsers,
  authState,
  chatState,
  chats: chatState.chat,
});

const passDispatchToProps = (dispatch: any) => ({
  exitChatInfo: (payload: any) => dispatch(exitChat(payload)),
  createNewGroupStart: (payload: any) => dispatch(createNewGroup(payload)),
});

export const CreateChatGroup = connect(
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
    actualUserList,
    actualGrpName
  }: any) => {

  const [userList, setUserList] = useState(authUsers);
  const [grpName, setGrpName] = useState("");

  useEffect(() => {
    actualUserList(userList)
  }, [userList])

  useEffect(() => {
    actualGrpName(grpName)
  }, [grpName])

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

  return (
    <div>
      <div>
        <div>
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
            <input
              value={grpName}
              onChange={(e: any) => setGrpName(e.target.value)}
              maxLength={30}
              placeholder="Название чата"
              type="text"
            />
          </div>
          <p className={s.text}>Пользователи</p>
          <div className={s.chatsContainer}>
            {Object.entries(userList)
              .filter((e: any) => (e[1]?.selected ? false : true))
              .map((data: any) => {
                return (
                  (!chatState.userSearch.length || data[1].displayName.includes(chatState.userSearch)) ?
                  (<div
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
      </div>
    </div>
  );

}
)