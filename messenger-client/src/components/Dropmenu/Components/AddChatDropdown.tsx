// import s from "../sidebarStyles.module.scss";
import { connect } from "react-redux";
import { DropdownAnimation } from "animations/dropdown/DropdownAnimation";
import s from "./dropmenu.module.scss";
import { UserSidebar } from "components/SidebarModal/Modals/UserSidebar";
import { NewMsgSidebar } from "components/SidebarModal/Modals/NewMsgSidebar";
import { AddUsersToGroup } from "components/SidebarModal/Modals/AddUsersToGroup";
import { useEffect, useState } from "react";

const passStateToProps = ({ dropDownMenu }: any) => ({
  dropMenu: dropDownMenu.dropDown,
});


export const AddChatDropdown = connect(passStateToProps)(
  ({ dropMenu, fixedDropdown, isNewGroup }: any) => {
    const [type, setType] = useState('')
    
    const sizeParam = {
        height: 500,
        width: 400,
        yOffset: 0,
        xOffset: 142,
    };
    
    // useEffect(() => {
        
    // }, [type]);
    
    return (
      <DropdownAnimation
        sizeParam={sizeParam}
        locationParams={dropMenu.position}
        className={s.dropDown}
        fixedDropdown={true}
      >
        <div className={s.dropDownWidth}>
            {isNewGroup ? <AddUsersToGroup />
                : <NewMsgSidebar />
            }
        </div>
        {/* <div className={s.dropDownWidth}>
            <AddUsersToGroup />
        </div> */}
      </DropdownAnimation>
    );
  }
);
