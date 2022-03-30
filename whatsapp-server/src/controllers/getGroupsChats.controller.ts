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
      .find({ refId: new ObjectID(refId) })
      .sort({ timestamp: 1 })
      .toArray();
    
    console.log('getMessages function')
    console.log(await messages[messages.length-1])
    return await messages[messages.length-1]
  } catch (err) {
    console.log(err)
  }
};

const mergeArrays = (arr1: any, arr2: any) => {

  const merged = _.merge(_.keyBy(arr1, '_id'), _.keyBy(arr2, '_id'));
  const values = _.values(merged);
  // console.log(values)
  // return result;
};

const enumerationArray = async (db: any, arr: any) => {

  try {
    const result = await arr.map(async (el: any) => await getMessages(db, el._id))

    console.log("enumerationArray", result)
    return await result;
  } catch( err) {
    console.log(err)
  }
};


// Get total chats and groups in database
export const getGroupsChats = async (req: any, res: any) => {
  try {
    const db: any = await mongoDB().db();
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


    console.log('chats', await chats)
    
    const messagesChats = await enumerationArray(db, chats)
    console.log('messagesChats', await messagesChats)

    const allChats = mergeArrays(chats, messagesChats)
    // console.log(allChats)
    
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

      // console.log('groups', groups)
      // const messagesGroups = groups.map((el: any) => {
      //   getMessages(el._id)
      // })
      // console.log('messagesGroups', messagesGroups)

    const fi: any = [...chats, ...groups].sort(
      (x, y) => x.timestamp - y.timestamp
    );
    // console.log(fi)
    return res.status(201).json({
      data: fi,
    });
  } catch (err) {
    console.log(err);
    res.send(404).end();
  }
};
