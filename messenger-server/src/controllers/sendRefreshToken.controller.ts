import { mongoDB } from "../database/mongoInstance";
import { verify } from "jsonwebtoken";
import { ObjectId } from "bson";
import { accessTokenExp, refreshTokenExp } from "../constants/token.constants";
import { createAccessToken, createRefreshToken } from "../utils/handleTokens";

export const sendRefreshToken = async (req: any, res: any) => {
  console.log('1')
  const db: any = await mongoDB().db();
  // console.log(db)
  console.log('2')
  const token: any = req.cookies.wc_RTN;

  console.log(req.cookies)
  if (!token) {
    return res.status(401).send({
      error: "Not Authorized!",
    });
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return res.status(401).send({
      error: "Not Authorized!",
    });
  }

  // console.log(new ObjectId(payload._id))
  
  const { _id }: any = await db
    .collection("googleAuthUsers")
    .findOne({ _id: new ObjectId(payload._id) });

  // const { _id }: any = null;

  if (!_id) {
    return res.status(401).send({
      error: "Not Authorized!",
    });
  }

  const newAccessToken = createAccessToken(payload._id, accessTokenExp);
  const newRefreshToken = createRefreshToken(payload._id, refreshTokenExp);

  res.cookie("wc_RTN", newRefreshToken, {
    maxAge: refreshTokenExp,
    httpOnly: true,
  });

  return res.send({
    accessToken: newAccessToken,
  });
};
