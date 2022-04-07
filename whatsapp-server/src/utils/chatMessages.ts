import { ObjectID } from "bson";
import { mongoDB } from "../database/mongoInstance";
const _ = require('lodash');

async function getMessages (db: any, id: any) {
    try {
        const refId = id;
        
        // const db: any = mongoDB().db();
            
        const messages: any = db
            .collection("messages")
            .find({ refId: new ObjectID(refId) })
            .sort({ timestamp: 1 })
            .toArray()

        // const messages: any = await collection
        //     .find({ refId: new ObjectID(refId) })
        //     // .sort({ timestamp: 1 })
        //     .toArray();
        
        console.log('getMessages function')
        console.log(messages)
        // return await messages
        // console.log(messages[messages.length-1])
        return messages[messages.length-1]
    } catch (err) {
      console.log(err)
    }
  };

export const mergeArrays = (arr1: any, arr2: any) => {

    const merged = _.merge(_.keyBy(arr1, '_id'), _.keyBy(arr2, '_id'));
    const values = _.values(merged);
    return values;
    // console.log(values)
    // return result;
};

export function enumerationArray (db: any, arr: any) {

    try {
      const result = arr.map((el: any) => getMessages(db, el._id))
      // const result = getMessages(db, arr[0]._id)
  
      console.log("enumerationArray", result)
      return result;
    } catch( err) {
      console.log(err)
    }
};
  