import s from "./dropmenu.module.scss";
import { connect } from "react-redux";
import { DropdownAnimation } from "animations/dropdown/DropdownAnimation";
import { setChatContainerModal } from "redux/reducers/chatContainerModal";
import { setDropDown } from "redux/reducers/dropDown";

const passStateToProps = ({ dropDownMenu }: any) => ({
  dropMenu: dropDownMenu.dropDown,
});

const passDispatchToProps = (dispatch: any) => ({
  setChatContainerModal: (modal: any) => dispatch(setChatContainerModal(modal)),
  setDropMenu: (dropMenu: any) => dispatch(setDropDown(dropMenu)),
});


export const ActiveChatInfo = connect(passStateToProps, passDispatchToProps)(
  ({ dropMenu, fixedDropdown, setChatContainerModal, setDropMenu }: any) => {
    const sizeParam = {
      height: 170,
      width: 140,
      yOffset: 175,
      xOffset: 142,
    };

    const handleInformationChatClick = () => {
      setDropMenu(false)
      setChatContainerModal({
        type: "userinfoModal",
      })
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
        {/* <div className={s.list}>
          <p>Select messages</p>
        </div>
        <div className={s.list}>
          <p>Mute notifications</p>
        </div> */}
        <div className={s.list}>
          <p>Выйти из чата</p>
        </div>
        <div className={s.list}>
          <p>Удалить чат</p>
        </div>
      </DropdownAnimation>
    );
  }
);
