import React from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import { CallerInfo } from "components/CallerInfo/CallerInfo";
import { connect } from "react-redux";
import s from "./App.module.scss";
import t from "./components/SidebarVoices/sidebarVoices.module.scss";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { DropMenu } from "./components/Dropmenu/Dropmenu";
import { GlobalModal } from "./components/GlobalModal/GlobalModal";
import { Login } from "./components/Login/Login";
import { MovableModal } from "./components/MovableModal/MovableModal";
import { RoomModal } from "./components/RoomModal/RoomModal";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { getAccessToken } from "utils/accessToken";
import { SidebarChatSkeletons } from "skeletons/SidebarChatSkeletons";
import { SidebarChats } from "components/SidebarChats/SidebarChats";
import { SidebarVoices } from "components/SidebarVoices/SidebarVoices";
import VideoPage from "components/videoPage/videoPage";

const passStateToProps = ({ authState, chatState }: any) => ({
  authState,
  chatState
});

const App = connect(passStateToProps)(({ authState, chatState }: any) => {
  return (authState.auth ? (
    <div>
        <Routes>
          <Route path='/videoPage' element={<VideoPage />}/>
        </Routes>
      {/* {authState.socketStatus ? null : (
        <div className={s.smoke}>
          <div className={s.modal}>
            <div className={s.disconnectedModal}>
              <p>Sorry, server down. We'll be back back soon.</p>
            </div>
          </div>
        </div>
      )} */}
      <CallerInfo />
      <RoomModal />
      <MovableModal />
      <GlobalModal />
      <DropMenu />
      <div className={s.app}>
        <div className={s.appContainer}>
          {/* <div className={t.sidebarVoicesIndent}>
            {chatState.loading
              ? ''
              : Object.entries(chatState.chat).map(([id, data]: any) => {
                  return <SidebarVoices key={id} /> 
                })}
          </div> */}
          <Sidebar />
          <ChatContainer />
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        textAlign: "center",
      }}
      className={s.app}
    >
      <Login />
    </div>
  ));
});

export default App;
