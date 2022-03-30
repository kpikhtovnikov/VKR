import { ActiveChatInfo } from "./Components/ActiveChatInfo";
import { AddAvatarDropdown } from "./Components/AddAvatarDropdown";
import { ChangeAvatarDropdown } from "./Components/ChangeAvatarDropdown";
import { ChatInfoDropdown } from "./Components/ChatInfoDropdown";
import { connect } from "react-redux";
import { PersonalSettingDropdown } from "./Components/PersonalSettingDropdown";
import { AddChatDropdown } from "./Components/AddChatDropdown";
import { FilesDropDown } from "components/Dropmenu/Components/FilesDropDown";

const passStateToProps = ({ dropDownMenu }: any) => ({
    dropMenu: dropDownMenu.dropDown,
});

export const DropMenu = connect(passStateToProps)(({ dropMenu }: any) => {
    switch (dropMenu.type) {
        case "addAvatar":
            return <AddAvatarDropdown />;
        case "changeAvatar":
            return <ChangeAvatarDropdown />;
        case "chatInfo":
            return <ChatInfoDropdown />;
        case "activeChatInfoToggle":
            return <ActiveChatInfo fixedDropdown={true} />;
        case "activeChatInfo":
            return <ActiveChatInfo />;
        case "personalSetting":
            return <PersonalSettingDropdown />;
        case "addChat":
            // return <AddChatDropdown />;
            return <AddChatDropdown isNewGroup={true}/>;
        case "addFiles":
            return <FilesDropDown />;
        // case "addToGroup":
        //     return <AddChatDropdown isNewGroup={true}/>;
        default:
            return (
                <div
                    style={{
                        display: "none",
                    }}
                />
            );
    }
});
