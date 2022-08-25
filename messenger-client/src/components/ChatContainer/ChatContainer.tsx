import { connect } from "react-redux";
import s from "./chatContainerStyles.module.scss";
import { ChatModal } from "../ChatModal/ChatModal";
import { ChatContainerBody } from "../ChatContainerBody/ChatContainerBody";
import { ChatContainerFooter } from "../ChatContainerFooter/ChatContainerFooter";
import { ChatContainerHead } from "../ChatContainerHead/ChatContainerHead";
import { AttachmentModal } from "../AttachmentModal/AttachmentModal";
import idleImage from "./connect.jpg";

const passStateToProps = ({ chatModal, chatState }: any) => ({
  chatContainerModal: chatModal.modal,
  activeChatId: chatState.activeChat,
});

export const ChatContainer = connect(passStateToProps)(
  ({ chatContainerModal, activeChatId }: any) => {
    const handleLink = (to: string) => window.open(to, "_blank");
    return (
      <div className={s.chatContainer}>
        {activeChatId ? (
          <div className={s.chatMain}>
            <AttachmentModal />
            <ChatContainerHead />
            <ChatContainerBody />
            <ChatContainerFooter />
          </div>
        ) : (
          <div className={s.idleWrapper}>
            <div className={s.idleDiv}>
              <img className={s.idleImg} src={idleImage} alt="idle-img" />
              <p>Добро пожаловать!</p>
            </div>
          </div>
        )}
        {chatContainerModal && <ChatModal />}
      </div>
    );
  }
);
