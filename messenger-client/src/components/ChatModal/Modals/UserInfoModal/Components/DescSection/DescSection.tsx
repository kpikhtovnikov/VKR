import { useState } from "react";
import { connect } from "react-redux";
import { initGroupInfoUpdate } from "redux/reducers/chat";
import s from "./descSection.module.scss";

const passStateToProps = ({ dropDownMenu, chatState }: any) => ({
  activeChat: chatState.chat[chatState.activeChat],
});

const passDispatchToProps = (dispatch: any) => ({
  initGroupInfoUpdate: (payload: any) => dispatch(initGroupInfoUpdate(payload)),
});

export const DescSection = connect(
  passStateToProps,
  passDispatchToProps
)((props: any) => {
  console.log(props);
  const [editDescBool, setEditDesc] = useState(false);
  const [newDesc, setNewDesc] = useState(props.desc ?? props?.userInfo?.about);

  const handleDescUpdate = () => {
    //TODO
    props.initGroupInfoUpdate({
      groupId: props.activeChat.chatInfo._id,
      updatedParams: {
        desc: newDesc,
      },
    });
    setEditDesc(false);
  };

  return (
    <div className={s.infoModalDesc}>
      <p className="chatModalSectionTitle">
        {props?.userInfo ? "Должность" : "Описание"}
      </p>
      <div
        style={
          editDescBool
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
          contentEditable={props?.userInfo ? false : editDescBool}
          onInput={(e: any) => {
            try {
              setNewDesc(e.target.outerText);
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
          {newDesc}
        </span>

        {props?.userInfo ? null : (
          <div className={s.editNameButton}>
            {editDescBool ? (
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
                onClick={() => setEditDesc(true)}
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
        )}
      </div>
    </div>
  );
});
