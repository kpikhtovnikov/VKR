import s from "./sidebarStyles.module.scss";
import { SidebarChats } from "../SidebarChats/SidebarChats";
import { SidebarHead } from "../SidebarHead/SidebarHead";
import { SidebarSearch } from "../SidebarSearch/SidebarSearch";
import { SidebarModal } from "../SidebarModal/SidebarModal";
import { connect } from "react-redux";
import { SidebarChatSkeletons } from "skeletons/SidebarChatSkeletons";
import { SidebarVoices } from "components/SidebarVoices/SidebarVoices";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

const passStateToProps = ({ chatState }: any) => ({
  chatState,
});

export const Sidebar = connect(passStateToProps)(({ chatState }: any) => {
  
  const [chat , setChat] = useState(chatState)
  // const fuse = new Fuse(chatState.chat, { keys: ['chatInfo.name', 'name'] });
  let result = []

  // useEffect(() => {
  //   // console.log(chatState.search)
  //   console.log(chatState.chat)
  //   setChat(fuse.search(chatState.search))
  //   // console.log(fuse)
  //   console.log(fuse.search(chatState.search))
  // }, [chatState])

  return (
    <div className={s.sidebar}>
      <SidebarModal />
      <SidebarHead />
      {/* <SidebarSearch /> */}
      <div className={s.chatsContainer}>
        {chatState.loading
          ? [1, 2, 3].map((e) => {
              return <SidebarChatSkeletons />;
            })
          // : (!chatState.search.length ? Object.entries(chatState.chat).map(([id, data]: any) => {
          //       return <SidebarChats key={id} data={data} />}) :  
          //     (Object.entries(chatState.chat).map(([id, data]: any) => {
          //       return <SidebarChats key={id} data={data} /> 
          //     }))
          //   )
          : Object.entries(chatState.chat).map(([id, data]: any) => {
              return <SidebarChats key={id} data={data} />}) 
        }
      </div>
    </div>
  );
});
