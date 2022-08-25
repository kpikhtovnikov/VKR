import { useState } from "react";
import { connect } from "react-redux";
import { initAuthuserInfoUpdate, initiateLogout } from "redux/reducers/auth";
import { AddNewAvatar } from "components/ChatModal/Modals/UserInfoModal/Components/AvatarSection/AvatarSection";
import s from "../sidebarModal.module.scss";
import compress from "react-image-file-resizer";
import { setDropDown } from "redux/reducers/dropDown";
import { setGlobalModal } from "redux/reducers/globalModal";

const passStateToProps = ({ authState, dropDownMenu }: any) => ({
  dropMenu: dropDownMenu.dropDown,
  authState: authState.auth,
});

const passDispatchToProps = (dispatch: any) => ({
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
  setGlobalModal: (modal: any) => dispatch(setGlobalModal(modal)),
  initiateLogout: () => dispatch(initiateLogout()),
  initAuthuserInfoUpdate: (payload: any) =>
    dispatch(initAuthuserInfoUpdate(payload)),
});

export const UserSidebar = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    initiateLogout,
    authState,
    setDropMenu,
    setGlobalModal,
    dropMenu,
    initAuthuserInfoUpdate,
  }: any) => {
    const [editName, setEditName] = useState(false);
    const [newName, setNewName] = useState(authState.displayName);
    const [editBioBool, setEditBio] = useState(false);
    const [newBio, setNewBio] = useState(authState.about);
    const [hoverForNewAvatar, setHoverForNewAvatar] = useState(false);

    const handleDescUpdate = () => {
      initAuthuserInfoUpdate({
        about: newBio,
      });
      setEditBio(false);
    };

    const handleNameUpdate = () => {
      initAuthuserInfoUpdate({
        displayName: newName,
      });
      setEditName(false);
    };

    const handleCompressedImage = (base64Data: string) => {
      initAuthuserInfoUpdate({
        avatar: base64Data,
      });
      setDropMenu("");
    };

    const handleRemoveImage = () => {
      setGlobalModal({
        type: "removeAvatar",
        params: {
          removeAvatar: () => {
            initAuthuserInfoUpdate({
              avatar: null,
            });
            setGlobalModal(null);
          },
        },
      });
      setDropMenu("");
    };

    const handleAvatarChange = async (file: any) => {
      compress.imageFileResizer(
        file,
        480,
        480,
        "PNG",
        70,
        0,
        handleCompressedImage,
        "base64"
      );
    };

    const handleDropMenuClicks = (e: any, type: string) => {
      setDropMenu({
        type,
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        params: {
          handleAvatarChange: handleAvatarChange,
          handleRemoveImage: handleRemoveImage,
          src: type === "changeAvatar" ? authState.avatar : null,
        },
      });
    };

    return (
      <div className={s.sidebarModalBody}>
        {authState?.avatar ? (
          <div
            onMouseLeave={() => setHoverForNewAvatar(false)}
            onMouseOver={() => setHoverForNewAvatar(true)}
            className={s.userImage}
          >
            {/* @ts-ignore */}
            {(hoverForNewAvatar || dropMenu?.type === "changeAvatar") && (
              <AddNewAvatar
                handleAvatarChange={handleAvatarChange}
                handleDropMenuClicks={(e: any) =>
                  handleDropMenuClicks(e, "changeAvatar")
                }
                type="change"
              />
            )}
            <img src={authState.avatar} alt="user-img" />
          </div>
        ) : (
          <div className={s.userImage}>
            <AddNewAvatar
              type="add"
              handleDropMenuClicks={(e: any) =>
                handleDropMenuClicks(e, "addAvatar")
              }
              handleAvatarChange={handleAvatarChange}
            />
            <div className={s.mainIcon}>
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </div>
          </div>
        )}

        <div className={s.section}>
          <small>Имя</small>
          <div
            style={
              editName
                ? {
                    borderBottom: "2px solid #00af9c",
                    marginBottom: 2,
                  }
                : {}
            }
            className={`${s.infoSub}`}
          >
            <input
              value={newName}
              disabled={!editName || authState.authType === "guest"}
              onChange={(e: any) => setNewName(e.target.value)}
              type="text"
            />
            {authState.authType !== "guest" ? (
              <div className={s.editNameButton}>
                {/* {editName && <small>{25 - newName.length ?? 0}</small>} */}
                {editName ? (
                  <svg
                    onClick={handleNameUpdate}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    onClick={() => setEditName(true)}
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
                )}
              </div>
            ) : null}
          </div>
        </div>
        <p className={s.info}>
          Заполните свою текущую должность
        </p>
        <div className={s.section}>
          <small>Должность</small>
          <div
            style={
              editBioBool
                ? {
                    borderBottom: "2px solid #00af9c",
                    marginBottom: 2,
                  }
                : {}
            }
            className={s.infoSub}
          >
            <span
              className={s.input}
              onPaste={(e: any) => e.preventDefault()}
              onDrag={(e: any) => e.preventDefault()}
              onDrop={(e: any) => e.preventDefault()}
              contentEditable={editBioBool && authState.authType !== "guest"}
              onInput={(e: any) => {
                try {
                  setNewBio(e.target.outerText);
                  var selection: any = window.getSelection();
                  var range = document.createRange();
                  selection.removeAllRanges();
                  range.selectNodeContents(e.target);
                  range.collapse(false);
                  selection.addRange(range);
                  e.target.focus();
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              {newBio}
            </span>

            {authState.authType !== "guest" ? (
              <div className={s.editNameButton}>
                {editBioBool ? (
                  <svg
                    onClick={handleDescUpdate}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    onClick={() => setEditBio(true)}
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
                )}
              </div>
            ) : null}
          </div>
        </div>
        <button onClick={() => initiateLogout()} className={s.logoutBtn}>
          Выйти
        </button>
      </div>
    );
  }
);
