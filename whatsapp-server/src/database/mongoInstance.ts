import { error } from "console";
import * as mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
// const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@whatsapp-clone-mongodb.bgdrv.mongodb.net/whatsapp-clone?retryWrites=true&w=majority`;
// const mongoURI = `mongodb+srv://test:TQf807E0w7hjXdXq@cluster0.rwvpw.mongodb.net/Cluster0?retryWrites=true&w=majority`
  const mongoURI = 'mongodb://127.0.0.1:27017';

// mongo db instance
let db: any;

// initial config
export const inititalizeMongoDb = async () => {  
  try {
    const client = await MongoClient.connect(mongoURI);
    // console.log(client)
    db = client;
    // await db.createCollection('googleAuthUsers')
    return db;
  } catch {
    console.log('inititalizemongo')
    console.log(error)
  }
};

// get mongo instance
export const mongoDB = () => db;
