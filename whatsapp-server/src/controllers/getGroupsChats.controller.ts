import { ObjectID } from "bson";
import { resolve } from "path";
import { resourceLimits } from "worker_threads";
import { mongoDB } from "../database/mongoInstance";
const _ = require('lodash');

// get messages corresponding to a chat or group
const getMessages = async (db: any, id: any) => {
  try {
    const refId = id;
      
    const messages = await db
      .collection("messages")
      .find({ refId: refId })
      .sort({ timestamp: 1 })
      .toArray()

    return messages[messages.length-1]
  } catch (err) {
    console.log(err)
  }
};

const mergeArrays = (arr1: any, arr2: any) => {

  const merged = _.merge(_.keyBy(arr2, 'refId'), _.keyBy(arr1, '_id'));
  const values = _.values(merged);
  // console.log(values)
  return values;
};


// Get total chats and groups in database
export const getGroupsChats = async (req: any, res: any) => {
  try {
    const db: any = await mongoDB().db();
    let messagesChats = []

    const chats: any = await db
      .collection("chats")
      .find({
        participants: {
          $elemMatch: {
            objectId: new ObjectID(req.payload._id),
          },
        },
      })
      .toArray();

    messagesChats = await Promise.all(chats.map((el:any) => {
      return getMessages(db, el._id);
    }))
    
    const allChatsWithMessages = mergeArrays(chats, messagesChats)
    // console.log('allChats', allChatsWithMessages)
    
    const groups: any = await db
      .collection("groups")
      .find({
        participants: {
          $elemMatch: {
            objectId: new ObjectID(req.payload._id),
          },
        },
      })
      .toArray();

    messagesChats = await Promise.all(groups.map((el:any) => {
      return getMessages(db, el._id);
    }))

    const allGroupsWithMessages = mergeArrays(groups, messagesChats)
    // console.log('allGroups', allGroupsWithMessages)

    const fi: any = [...allChatsWithMessages, ...allGroupsWithMessages].sort(
      (x, y) => y.timestamp - x.timestamp
    );
    // const fi: any = [...chats, ...groups].sort(
    //   (x, y) => x.timestamp - y.timestamp
    // );
    console.log(fi)
    return res.status(201).json({
      data: fi,
    });
  } catch (err) {
    console.log(err);
    res.send(404).end();
  }
};