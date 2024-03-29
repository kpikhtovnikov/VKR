import * as express from "express";
import * as multer from "multer";
import { getMessages } from "./controllers/getMessages.controller";
import { getGroupsChats } from "./controllers/getGroupsChats.controller";
import { isAuthREST } from "./middlewares/isAuthREST.middleware";
import { handleFileUpload } from "./controllers/handleFileUpload.controller";
import { handleGetResource } from "./controllers/handleGetResource.controller";
import { handleNewGroup } from "./controllers/handleNewGroup.controller";
import { handleNewChat } from "./controllers/handleNewChat.controller";
import { sendRefreshToken } from "./controllers/sendRefreshToken.controller";
import { googlelogin } from "./controllers/googleLogin.controller";
import { logout } from "./controllers/logout.controller";
import { handleDeleteChat } from "./controllers/handleDeleteChat.controller";
import { handleExitChat } from "./controllers/handleExitChat.controller";
import { handleUpdateParticipantsGroup } from "./controllers/handleUpdateParticipantsGroup.controller";
export const router: express.Router = express.Router();

// temp upload location for files
const uploadLocation = multer({ dest: "uploads/" });

// check if server is active
router.get("/", (_: any, res: any) => {
  res.json({
    active: true,
  });
});

// refresh access token and update the refresh token
router.get("/refresh-token", sendRefreshToken);

// signin with google
router.post("/g-auth/authenticate", googlelogin);

// logout user
router.get("/logout", isAuthREST, logout);

// get messages of a particular chat, group
router.get("/chats/:refId", isAuthREST, getMessages);

// get chats, groups for a particular user
router.get("/chats", isAuthREST, getGroupsChats);

// upload files
router.post(
  "/file-upload/:fileType",
  isAuthREST,
  uploadLocation.single("messenger-clone-message-file"),
  handleFileUpload
);

// chat message files
router.get("/resources/:fileType/:key", handleGetResource);

router.post("/create-new-group", isAuthREST, handleNewGroup);

router.post("/create-new-chat", isAuthREST, handleNewChat);
router.delete("/delete-chat", isAuthREST, handleDeleteChat);
router.put("/exit-chat", isAuthREST, handleExitChat);
router.put("/participants-group", isAuthREST, handleUpdateParticipantsGroup);

export default router;
