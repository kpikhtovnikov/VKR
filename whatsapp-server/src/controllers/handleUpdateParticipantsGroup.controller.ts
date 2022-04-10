import { ObjectId } from "bson";
import { mongoDB } from "../database/mongoInstance";

export const handleUpdateParticipantsGroup = async (req: any, res: any) => {
  const db: any = await mongoDB().db();
  const {
    _id,
    participants,
    modifiedOn,
    type,
    desc,
    createdOn,
    avatar,
    name,
  }: any = req.body;

  const participantsGroup = participants.map((el: any) => {
    return {
      objectId: new ObjectId(el.objectId),
      lastViewed: el.lastViewed
    }
  })

  if (!_id) {
    return res.sendStatus(404);
  }

  const collection = await db.collection("groups").updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: { participants: participantsGroup },
    }
  );

  if (!collection.acknowledged) {
    return res.sendStatus(404)
  }

  return res.sendStatus(200);
};
