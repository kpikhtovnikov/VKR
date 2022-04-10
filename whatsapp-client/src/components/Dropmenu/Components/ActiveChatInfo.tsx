import s from "./dropmenu.module.scss";
import { connect } from "react-redux";
import { DropdownAnimation } from "animations/dropdown/DropdownAnimation";
import { setChatContainerModal } from "redux/reducers/chatContainerModal";
import { setDropDown } from "redux/reducers/dropDown";
import { ExitModalChatInfo } from "./ExitModalChatInfo";
import { DeleteModalChatInfo } from "./DeleteModalChatInfo";
import { setActiveChat } from "redux/reducers/chat";

const passStateToProps = ({ dropDownMenu, chatState, authState }: any) => ({
  dropMenu: dropDownMenu.dropDown,
  activeChat: chatState.chat[chatState.activeChat],
  myObjId: authState.auth.objectId,
});

const passDispatchToProps = (dispatch: any) => ({
  setChatContainerModal: (modal: any) => dispatch(setChatContainerModal(modal)),
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
  setActiveChat: (activeChat: any) => dispatch(setActiveChat(activeChat)),
});


export const ActiveChatInfo = connect(passStateToProps, passDispatchToProps)(
  ({ activeChat, myObjId, dropMenu, fixedDropdown, setChatContainerModal, setDropMenu, setActiveChat }: any) => {
    const sizeParam = {
      height: 170,
      width: 140,
      yOffset: 175,
      xOffset: 142,
    };

    const otherFriend =
    activeChat?.chatInfo?.type === "chat"
      ? activeChat?.chatInfo?.participants.find((e: any) => {
          console.log(e);
          return e.objectId !== myObjId;
        })
      : null;

    const handleInformationChatClick = () => {
      setDropMenu(false)
      setChatContainerModal({
        type: "userinfoModal",
      })
    };

    const handleActiveChat = () => {
      setDropMenu(false);
      setChatContainerModal(null);
  
      setActiveChat({
        prevActiveChat: {
          prevActiveChatId: activeChat?.chatInfo._id,
          prevActiveChatType: activeChat?.chatInfo.type,
        },
        switchTo: null
      });
    };

    return (
      <DropdownAnimation
        sizeParam={sizeParam}
        locationParams={dropMenu.position}
        className={s.dropDown}
        fixedDropdown={fixedDropdown}
      >
        <div className={s.list}>
          <p
            onClick={handleInformationChatClick}
          >Информация о чате</p>
        </div>
        <div className={s.list}>
          { otherFriend ? null : 
            <ExitModalChatInfo />
          }
        </div>
        <div className={s.list}>
          <DeleteModalChatInfo />
        </div>
        <div className={s.list}>
          <p
            onClick={handleActiveChat}
          >Закрыть чат</p>
        </div>
      </DropdownAnimation>
    );
  }
);
