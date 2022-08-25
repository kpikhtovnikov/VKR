import { all } from "@redux-saga/core/effects";
import {
  initAuthuserInfoUpdateSaga,
  initiateSignInSaga,
  initLogout,
} from "./authSagas";
import {
  activeChatSwitch,
  handleGroupCreation,
  initChatLoad,
  initGroupInfoUpdateSaga,
  initSendMsgStart,
  deleteChatSaga,
  exitChatSaga,
  updateGroupParticipants
} from "./chatSagas";
import { initCallSaga } from "./callerInfoSagas";
import { initFileUpload } from "./uploadAttachmentSaga";

export default function* rootSaga() {
  yield all([
    initiateSignInSaga(),
    initLogout(),
    initChatLoad(),
    initSendMsgStart(),
    initFileUpload(),
    initCallSaga(),
    handleGroupCreation(),
    // activeChatSwitch(),
    initGroupInfoUpdateSaga(),
    initAuthuserInfoUpdateSaga(),
    deleteChatSaga(),
    exitChatSaga(),
    updateGroupParticipants()
  ]);
}
