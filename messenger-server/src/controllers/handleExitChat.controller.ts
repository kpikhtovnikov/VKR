import { ObjectID} from "bson";
import { mongoDB } from "../database/mongoInstance";

export const handleExitChat = async (req: any, res: any) => {
  const db = await mongoDB().db();
  const { chatId, _id } = req.body;

  if (!_id || !chatId) {
    return res.sendStatus(404);
  }

  console.log(_id, 'space', chatId)

  let chat;

  if (req.body.type === 'chat') {

    chat = await db
      .collection("chats").participants
      .deleteOne({ objectId: new ObjectID(_id)})

    console.log(chat)
  }

  if (req.body.type === 'group') {

    // chat = await db
    //   .collection("groups").participants
    //   .deleteOne({ ObjectId: new ObjectID(_id)})

    // chat = await db
    //   .collection("groups")
    //   .deleteOne({
    //     participants: {
    //       $elemMatch: {
    //         ObjectId: new ObjectID(_id),
    //       },
    //     },
    //   })

    // console.log(chat)
    
  }

  chat = await db
      .collection("groups")
    //   .find({
    //     _id: new ObjectID(chatId),
    //   })
      .updateOne(
        {
            _id: new ObjectID(chatId),
        },
        {
            $pull: {
                participants: { objectId: new ObjectID(_id) }
        }
        // participants: {
        //     $elemMatch: {
        //       objectId: new ObjectID(_id),
        //     },
        //   }
      })
    //   .toArray()

  console.log(chat)

  if (!chat.acknowledged) {
    return res.sendStatus(404)
  }

  return res.sendStatus(200);
};
