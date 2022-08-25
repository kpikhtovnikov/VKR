import { useState } from "react";
import { connect } from "react-redux";
import s from "./sidebarVoices.module.scss";
import { Avatar } from "@material-ui/core";

export const SidebarVoices = (() => {

    const handleDropMenuClicks = (e: any) => {
        alert('woy')
      };

    return (
        <div className={s.sidebarVoicesPanding}>
          <Avatar
          onClick={(e) => handleDropMenuClicks(e)}
            alt="sidebar-chat-avatar"
          />
      </div>
    );
  }
);
