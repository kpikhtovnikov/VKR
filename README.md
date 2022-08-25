# Messenger

### **Used Technologies:**<br/>
a) **Front End**: React Js, Redux, Redux-Saga, Axios, Socket Client, Peer JS, React Spring.<br/>
b) **Back End**: Node Js, Redis, Cluster, Socket.io, Mongo DB, Peer and Express, AWS S3.

#### Initial Setup:

Create a .env file inside of client and server folders respectively:

**- messenger-client/.env**
```
REACT_APP_GAUTH_CLIENT_ID=<Your_gauth_client_id>
REACT_APP_SERVER_URL=http://localhost:8181
REACT_APP_PEER_SERVER_URL=http://localhost:9000
```

**- messenger-server/.env**
```
MONGO_PASSWORD=<your_mondodb_password>
MONGO_USERNAME=<your_mongo_username>

GAUTH_CLIENT_ID=1<Your_gauth_client_id>
GAUTH_CLIENT_SECRET=<Your_gauth_client_secret>

JWT_REFRESH_SECRET=ERDTFGYUHIJKOftgybhjnkmTYFYGBHUNJ%^TUGHYNJKBVGFYGUHKJHVHFCV~BJHk
JWT_ACCESS_SECRET=TYFGHBJNKU*&YIUGJBHNKMLIYUHJKML<*&^YGHBNM<LO*&^%REW@ERFVBHJUYGVBN

AWS_S3_BUCKET_NAME=<s3_bucket_name>
AWS_S3_REGION_NAME=<s3_region_name>

AWS_ACCESS_KEY_ID=<access_key_id>
AWS_SECRET_ACCESS_KEY=<aws_secret_access_key>

```

### Installation:

- In messenger-server run:<br>
`npm i && npm run dev`

- In messenger-client run:<br>
`npm i && npm start`

- Install the package globally peer server:
1. $ npm install peer -g
2. Run the server:
$ peerjs --port 9000 --key peerjs --path /peer-server
Started PeerServer on ::, port: 9000, path: /peer-server (v. 0.3.2)

<br>
<br>
<br>
<br>

