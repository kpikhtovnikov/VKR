import { Avatar } from "@material-ui/core";
import { SidebarSearch } from "components/SidebarSearch/SidebarSearch";
import s from "../sidebarModal.module.scss";
import { connect } from "react-redux";
import { createNewChat, setActiveChat } from "redux/reducers/chat";
import { setSidebarModal } from "redux/reducers/sidebarChatModal";
import { setDropDown } from "redux/reducers/dropDown";
import { searchType } from "constants/searchText";
import Modal from "@material-ui/core/Modal";

const passStateToProps = ({ dropDownMenu, chatState, authState }: any) => ({
  authUsers: chatState.authUsers,
  activeChat: chatState.chat[chatState?.activeChat],
  guestUsers: chatState.guestUsers,
  chats: chatState.chat,
  dropDown: dropDownMenu.dropDown,
  authState,
  chatState
});

const passDispatchToProps = (dispatch: any) => ({
  setActiveChat: (activeChat: any) => dispatch(setActiveChat(activeChat)),
  createNewChat: (payload: any) => dispatch(createNewChat(payload)),
  setSidebarModal: (sidebarModal: any) =>
    dispatch(setSidebarModal(sidebarModal)),
  setPersonalSettingsDropdown: (dropDown: any) =>
    dispatch(setDropDown(dropDown)),
});

export const NewMsgSidebar = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    authState,
    authUsers,
    chats,
    chatState,
    setActiveChat,
    activeChat,
    closeModal,
    createNewChat,
    setSidebarModal,
    setPersonalSettingsDropdown,
    dropDown
  }: any) => {

    let users = {
      'objectId': 0
    }

    if(authUsers) {
      console.log(authUsers)
      users = authUsers
    }

    const handleOnClick = (data: any) => {
      const doesChatExist: any = Object.entries(chats).find((chat: any) => {
        const refChat = chat[1].chatInfo;
        const bool1 = refChat.participants.find(
          (user: any) => user.objectId === data[0]
        );
        const bool2 = refChat.type === "chat";
        return bool1 && bool2;
      });

      if (doesChatExist) {
        setActiveChat({
          prevActiveChat: {
            prevActiveChatId: activeChat?.chatInfo._id,
            prevActiveChatType: activeChat?.chatInfo.type,
          },
          switchTo: doesChatExist[1].chatInfo._id,
        });
        closeModal();
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
        closeModal();
      }
    };

    const toggleDropdown2 = (e: any) => {
      if (dropDown.type === "addToGroup") {
        setPersonalSettingsDropdown({
          type: "",
        });
      } else {
        setPersonalSettingsDropdown({
          type: "addToGroup",
          position: {
            // x: e.target.getBoundingClientRect().left - 55,
            // y: e.target.getBoundingClientRect().top - 68
            x: e.target.getBoundingClientRect().left + 10,
            y: e.target.getBoundingClientRect().top + 30,
          },
          params: {},
        });
      }
    }


    return (
      <div className={s.sidebarModalBody}>
        <SidebarSearch typeSearch={searchType.userSearch}/>
        <div className={s.allChats}>
          <div
            // onClick={() => {
            //   setSidebarModal({
            //     type: "addUsersToGroup",
            //     params: {
            //       headerTitle: "Создание чата",
            //     },
            //   });
            // }}
            onClick={toggleDropdown2}
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
                    <p>{data[1].displayName}</p>
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
      </div>
    );
  }
);