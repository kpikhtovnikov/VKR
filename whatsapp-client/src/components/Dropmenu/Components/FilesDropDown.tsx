// import s from "../sidebarStyles.module.scss";
import { animated as a, useTrail } from "@react-spring/web";
import { connect } from "react-redux";
import {
  addAttachments,
  resetFileAttachmentModal,
  setAttachmentModal,
  uploadAttachments,
} from "redux/reducers/attachmentModal";
import { setGlobalModal } from "redux/reducers/globalModal";
import { DropdownAnimationUp } from "animations/dropdown/DropdownAnimationUp";
import s from "./dropmenu.module.scss";
import { UserSidebar } from "components/SidebarModal/Modals/UserSidebar";
import { NewMsgSidebar } from "components/SidebarModal/Modals/NewMsgSidebar";
import { AddUsersToGroup } from "components/SidebarModal/Modals/AddUsersToGroup";
import { useEffect, useState } from "react";
import { CameraIcon, DocumentIcon, PictureIcon, VideoCallIcon } from "components/ChatContainerFooter/icons/ChatFooterIcons";
import { parseAttachmentFiles } from "utils/parseAttachementFiles";
import { v4 as uuidv4 } from "uuid";
import { ShowAttachmentAnimations } from "animations/chatFooterAnimation/ShowAttachmentAnimations";
import { AttachmentsAnimation } from "animations/chatFooterAnimation/AttachmentsAnimation";

const passStateFromProps = ({
  chatState,
  attachmentModal,
  authState,
  dropDownMenu
}: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
  attachmentModal,
  authUser: authState.auth,
  dropDown: dropDownMenu.dropDown,
  dropMenu: dropDownMenu.dropDown,
});

const passStateToProps = ({ dispatch }: any) => ({
  // dropMenu: dropDownMenu.dropDown,
  setAttachmentModal: (modal: any) => dispatch(setAttachmentModal(modal)),
  addAttachments: (files: any[]) => dispatch(addAttachments(files)),
  resetAttachmentModal: () => dispatch(resetFileAttachmentModal(null)),
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
  startUploadingAttachments: (payload: any) =>
    dispatch(uploadAttachments(payload)),
});


export const FilesDropDown = connect(
  passStateFromProps,
  passStateToProps
  )(
    ({
    activeChat,
    attachmentModal,
    authUser, 
    dropMenu, 
    isNewGroup, 
    setAttachmentModal,
    addAttachments,
    resetAttachmentModal,
    setGlobalModal,
    startUploadingAttachments,
  }: any) => {
    const [type, setType] = useState('')
    
    const sizeParam = {
        height: 500,
        width: 400,
        yOffset: 0,
        xOffset: 142,
    };

    const [activity, setActivity] = useState<boolean | string>(false);
    const [recording, setRecording] = useState(false);
    const [attachmentMenu, setAttachmentMenu] = useState(false);
    const [reverseRecordingAnimation, setReverseRecording] = useState(false);
    const [reverseAnimationAttachmentMenu, setReverseAnimationAttachmentMenu] =
      useState(false);
    const [reverseActivityAnimation, setReverseActivityAnimation] =
      useState(false);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState("");
    // const inputRef = useRef(null);

    const closeAttachmentMenu = () => {
      if (reverseAnimationAttachmentMenu) {
        setReverseAnimationAttachmentMenu(false);
        setAttachmentMenu(false);
      }
    };

    const handleAttachments = async (e: any) => {
      if (attachmentModal.files[0]) {
        resetAttachmentModal();
      }
      setReverseAnimationAttachmentMenu(true);
      const files = await parseAttachmentFiles(e.target.files);
      addAttachments(files);
      setAttachmentModal(activeChat?.chatInfo.id);
    };

    const sendClickedImage = async (e: Blob) => {
      closeAttachmentMenu();
      const file = new File([e], `${uuidv4().replaceAll("-", "")}.png`, {
        type: "image/png",
      });
      const parsedFile = await parseAttachmentFiles([file]);
      startUploadingAttachments({
        msgInfo: {
          type: activeChat.chatInfo.type,
          // msgType:"",
          refId: activeChat.chatInfo._id,
          timestamp: Date.now(),
          sentBy: authUser.objectId,
        },
        files: parsedFile,
        clientSide: activeChat.chatInfo?.clientSide,
      });
    };

    const takePhoto = () => {
      if (localStorage.getItem("_streamPermission")) {
        setGlobalModal({
          type: "takePhoto",
          params: {
            viaFooter: true,
            send: sendClickedImage,
          },
        });
      } else {
        setGlobalModal({
          type: "allowCamera",
          params: {},
        });
      }
    };


    const attachmentsArray = [
      {
        'element': 
        <PictureIcon className={s.pictureIcon}>
            <input
            onChange={handleAttachments}
            multiple={true}
            type="file"
            accept="image/png"
            />
            {/* Загрузить фото */}
        </PictureIcon>,
        'name': 'Загрузить фото'
      },
      {
        'element': <CameraIcon onClick={takePhoto} className={s.cameraIcon} />,
        'name': 'Сделать фото'
      },
      {
        'element':
        <DocumentIcon className={s.docIcon}>
            <input
            onChange={handleAttachments}
            type="file"
            multiple={false}
            accept=".docx, .doc, .pdf, .zip, .rar"
            />
      </DocumentIcon>,
        'name': 'Загрузить документ'
      },
      {
        'element':
        <VideoCallIcon className={s.videoIcon}>
            <input
            onChange={handleAttachments}
            type="file"
            multiple={false}
            accept="video/mp4"
            />
      </VideoCallIcon>,
        'name': 'Загрузить видео'
      },
      // <AvatarIcon className={s.avatarIcon} />,
    ];

    return (
      <DropdownAnimationUp
        sizeParam={sizeParam}
        locationParams={dropMenu.position}
        className={s.dropDown}
        fixedDropdown={true}
      >
        {
        //   <ShowAttachmentAnimations
        //     items={attachmentsArray}
        //     className={s.attachments}
        //     // reverse={reverseAnimationAttachmentMenu}
        //     // onClose={closeAttachmentMenu}
        //     reverse={true}
        //     onClose={true}
        // />
          <div className={s.dropDownWidth}>
            <AttachmentsAnimation items={attachmentsArray} />
          </div>
          // <div>f</div>
        }
      </DropdownAnimationUp>
    );
  }
);
