import { ObjectID} from "bson";
import { mongoDB } from "../database/mongoInstance";

export const handleDeleteChat = async (req: any, res: any) => {
  const db = await mongoDB().db();
  const _id = req.body._id;

  if (!_id) {
    return res.sendStatus(404);
  }

  let chat;

  if (req.body.type === 'chat') {

  chat = await db
      .collection("chats")
      .deleteOne({_id: new ObjectID(_id)})

  }

  if (req.body.type === 'group') {

  chat = await db
      .collection("groups")
      .deleteOne({_id: new ObjectID(_id)})
    
  }

  if (!chat.acknowledged) {
    return res.sendStatus(404)
  }

  return res.sendStatus(200);
};
