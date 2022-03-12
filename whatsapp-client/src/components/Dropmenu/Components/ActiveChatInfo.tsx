import s from "./dropmenu.module.scss";
import { connect } from "react-redux";
import { DropdownAnimation } from "animations/dropdown/DropdownAnimation";

const passStateToProps = ({ dropDownMenu }: any) => ({
  dropMenu: dropDownMenu.dropDown,
});

export const ActiveChatInfo = connect(passStateToProps)(
  ({ dropMenu, fixedDropdown }: any) => {
    const sizeParam = {
      height: 170,
      width: 140,
      yOffset: 175,
      xOffset: 142,
    };
    return (
      <DropdownAnimation
        sizeParam={sizeParam}
        locationParams={dropMenu.position}
        className={s.dropDown}
        fixedDropdown={fixedDropdown}
      >
        <div className={s.list}>
          <p>Информация о чате</p>
        </div>
        {/* <div className={s.list}>
          <p>Select messages</p>
        </div>
        <div className={s.list}>
          <p>Mute notifications</p>
        </div> */}
        <div className={s.list}>
          <p>Очистить сообщения</p>
        </div>
        <div className={s.list}>
          <p>Удалить чат</p>
        </div>
      </DropdownAnimation>
    );
  }
);
