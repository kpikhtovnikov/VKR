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
import { Button, Modal } from 'react-bootstrap';
import { DeleteModal } from "./DeleteModal";

const passStateToProps = ({ chatModal, chatState, authState }: any) => ({
  chatContainerModal: chatModal.modal,
  allUsers: chatState.authUsers,
  myObjId: authState.auth.objectId,
  activeChat: chatState.chat[chatState.activeChat],
});

const passDispatchToProps = (dispatch: any) => ({
  setChatContainerModal: (modal: any) => dispatch(setChatContainerModal(modal)),
  deleteChatInfo: (payload: any) => dispatch(deleteChat(payload)),
});


export const UserInfoModal = connect(
  passStateToProps,
  passDispatchToProps
)(({ activeChat, setReverseAnimation, myObjId, allUsers, deleteChatInfo }: any) => {


  const otherFriend =
    activeChat?.chatInfo?.type === "chat"
      ? activeChat?.chatInfo?.participants.find((e: any) => {
          console.log(e);
          return e.objectId !== myObjId;
        })
      : null;

  return (
    <div>
    <div className={s.userInfoModal}>
      <div className={s.modalHead}>
        <svg
          onClick={() => setReverseAnimation(true)}
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
        {otherFriend ? null : (
          <div className={s.exit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M16.6 8.1l1.2-1.2 5.1 5.1-5.1 5.1-1.2-1.2 3-3H8.7v-1.8h10.9l-3-3zM3.8 19.9h9.1c1 0 1.8-.8 1.8-1.8v-1.4h-1.8v1.4H3.8V5.8h9.1v1.4h1.8V5.8c0-1-.8-1.8-1.8-1.8H3.8C2.8 4 2 4.8 2 5.8v12.4c0 .9.8 1.7 1.8 1.7z"
              ></path>
            </svg>
            <p>Выйти из чата</p>
          </div>
        )}

        <div 
          className={s.report}
        >
          <div>{otherFriend ? <DeleteModal /> : <DeleteModal />}</div>
        </div>
      </div>
    </div>
    </div>
  );
});
