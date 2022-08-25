import s from "../../chatModal.module.scss";
import { connect } from "react-redux";
import { AvatarSection } from "./Components/AvatarSection/AvatarSection";
import { DescSection } from "./Components/DescSection/DescSection";
import { GeneralSettingsSection } from "./Components/GeneralSettingsSection/generalSettingsSection";
import { MediaSection } from "./Components/MediaSection/MediaSection";
import { ParticipantSection } from "./Components/ParticipantSection/ParticipantSection";
import { setChatContainerModal } from "redux/reducers/chatContainerModal";
import { useEffect, useState } from "react";
import { deleteChat } from "redux/reducers/chat";
import { Modal } from 'react-bootstrap';
import { DeleteModal } from "./DeleteModal";
import { ExitModal } from "./ExitModal";
import { EditParticipantsModal } from "./EditParticipantsModal";
import { setDropDown } from "redux/reducers/dropDown";
import { setActiveChat } from "redux/reducers/chat";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseButton from "@material-ui/icons/Close";

const passStateToProps = ({ chatModal, chatState, authState }: any) => ({
  chatContainerModal: chatModal.modal,
  allUsers: chatState.authUsers,
  myObjId: authState.auth.objectId,
  activeChat: chatState.chat[chatState.activeChat],
});

const passDispatchToProps = (dispatch: any) => ({
  setChatContainerModal: (modal: any) => dispatch(setChatContainerModal(modal)),
  deleteChatInfo: (payload: any) => dispatch(deleteChat(payload)),
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
  setActiveChat: (activeChat: any) => dispatch(setActiveChat(activeChat)),
});


export const UserInfoModal = connect(
  passStateToProps,
  passDispatchToProps
)(({ activeChat, setReverseAnimation, myObjId, allUsers, deleteChatInfo, setDropMenu, setActiveChat, setChatContainerModal }: any) => {


  const otherFriend =
    activeChat?.chatInfo?.type === "chat"
      ? activeChat?.chatInfo?.participants.find((e: any) => {
          console.log(e);
          return e.objectId !== myObjId;
        })
      : null;

  const handleHeaderClick = () => {
      setDropMenu(false)
      setReverseAnimation(true)
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
    <div>
    <div className={s.userInfoModal}>
      <div className={s.modalHead}>
        <svg
          onClick={handleHeaderClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="currentColor"
            d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"
          ></path>
        </svg>
        <p>{otherFriend ? "Чат" : "Чат"}</p>
      </div>
      <div className={s.infoModalBody}>
        <AvatarSection name="Notes" otherFriend={otherFriend?.objectId} />
        <DescSection
          userInfo={allUsers[otherFriend?.objectId]}
          desc={activeChat?.chatInfo?.desc}
        />
        <MediaSection />
        {/* {otherFriend ? null : <GeneralSettingsSection />} */}
        {otherFriend ? null : (
          <ParticipantSection onClose={() => setReverseAnimation(true)} />
        )}
        {/* {otherFriend ? null : (
          <div className={s.exit}>
            <EditParticipantsModal />
          </div>
        )} */}
        {otherFriend ? null : (
          <div className={s.exit}>
            <div><ExitModal /></div>
          </div>
        )}

        <div 
          className={s.report}
        >
          <div>{otherFriend ? <DeleteModal /> : <DeleteModal />}</div>
        </div>
        <div className={s.closeButtonDiv}>
          <Button 
            className={s.closeButton}
            variant="text" 
            onClick={handleActiveChat}
            >
            { <IconButton className={s.closeButton} aria-label="delete">
              <CloseButton fontSize="inherit"/>
            </IconButton> }
            <span className={s.closeButtonText}>
              Закрыть чат
            </span>
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
});
