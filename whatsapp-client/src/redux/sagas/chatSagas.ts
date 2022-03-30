import { takeLatest, call, put } from "@redux-saga/core/effects";
import { deleteChatOnMongoDb, saveNewChatOnMongoDb } from "api/saveNewChatOnMongoDb";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { getActiveSocket } from "config/globalSocket";
import {
  createNewGroup,
  getInitialChats,
  groupInfoUpdateSuccessfull,
  initGroupInfoUpdate,
  newChatSuccessfullyCreated,
  newGroupCreated,
  onChatsLoadComplete,
  sendMsgStart,
  setActiveChat,
  deleteChat,
  updateChats
} from "../reducers/chat";
import store from "../store";
import { globalAxios } from "config/globalAxios";

// Logout Saga
const getInitialChatData = async () => {
  const { data } = await globalAxios({
    method: "GET",
    url: `/chats`,
    withCredentials: true,
  });
  //@ts-ignore
  return data.data;
};

const getAllMessages = async (data: any) => {
  return await Promise.all(
    data.map(async (obj: any) => {
      const res = await globalAxios({
        method: "GET",
        url: `/chats/${obj._id}`,
        withCredentials: true,
      });
      console.log(res);
      //@ts-ignore
      return [obj, res.data.data];
    })
  );
};

export function* initChatLoad() {
  yield takeLatest(getInitialChats.type, function* () {
    //@ts-ignore
    const _all = yield call(getInitialChatData);
    //@ts-ignore
    const chats = yield call(getAllMessages, _all);
    const chatsObj = chats.reduce((result: any, item: any, index: number) => {
      result[item[0]._id] = {
        chatInfo: item[0],
        messages: item[1],
      };
      return result;
    }, {});
    yield put(onChatsLoadComplete(chatsObj));
  });
}

// Send Msg
export function* initSendMsgStart() {
  yield takeLatest(sendMsgStart.type, function* (action: any) {
    //@ts-ignore
    const socket = yield call(getActiveSocket);

    // If chat was just created and this is the first message being sent
    if (action.payload.clientSide) {
      delete action.payload.clientSide;
      const v: number = yield call(
        saveNewChatOnMongoDb,
        store.getState().chatState.chat[action.payload.refId],
        "/create-new-chat"
      );
      if (v === 200) {
        yield put(newChatSuccessfullyCreated(action.payload.refId));
        socket.emit("updateOthersChats", {
          chatInfo: {
            ...store.getState().chatState.chat[action.payload.refId].chatInfo,
          },
          messages: [],
        });
        socket.emit("iTextMessage", {
          ...action.payload,
        });
      }
    } else {
      // chat already existed, sending message
      socket.emit("iTextMessage", action.payload);
    }
  });
}

//delete chat
export function* deleteChatSaga() {
  yield takeLatest(deleteChat.type, function* (action: any) {
    console.log(store.getState().chatState.chat[action.payload.refId])
    console.log(action.payload)
    const v: number = yield call(
      deleteChatOnMongoDb,
      store.getState().chatState.chat[action.payload.refId],
      "/delete-chat"
    );
    console.log(v)
    if (v === 200) {

      // const chats = store.getState().chatState.chat
      // let chatsObj = [];
      // // })
      // for (let key in chats) {
      //   // console.log(key)
      //   if(key != action.payload.refId) {
      //     chatsObj.push(chats[key])
      //   }
      // }
      // yield put(onChatsLoadComplete(chatsObj));
    
      //@ts-ignore
    const _all = yield call(getInitialChatData);
    //@ts-ignore
    const chats = yield call(getAllMessages, _all);
    const chatsObj = chats.reduce((result: any, item: any, index: number) => {
      result[item[0]._id] = {
        chatInfo: item[0],
        messages: item[1],
      };
      return result;
    }, {});
    yield put(onChatsLoadComplete(chatsObj));

  } else {
      if (v === 404) {
        alert('Не удалось удалить чат')
      }
    }
  });
}

export function* activeChatSwitch() {
  yield takeLatest(setActiveChat.type, function* (action: any) {
    // yield getActiveSocket().emit("switchActiveChat", action.payload);
  });
}

export function* handleGroupCreation() {
  yield takeLatest(createNewGroup.type, function* (action: any) {
    const v: number = yield call(
      saveNewChatOnMongoDb,
      store.getState().chatState.chat[action.payload._id],
      "/create-new-group"
    );
    //@ts-ignore
    const socket = yield call(getActiveSocket);
    if (v === 200) {
      socket.emit("updateOthersChats", {
        chatInfo: action.payload,
        messages: [],
      });
      yield put(newGroupCreated(action.payload._id));
    }
  });
}

export function* initGroupInfoUpdateSaga() {
  yield takeLatest(initGroupInfoUpdate.type, function* (action: any) {
    const socket = getActiveSocket();
    yield socket.emit("updateGroupInfo", action.payload);
    yield put(groupInfoUpdateSuccessfull(action.payload));
  });
}
