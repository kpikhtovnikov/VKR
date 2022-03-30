import { globalAxios } from "config/globalAxios";
// import cors from "cors";

export const saveNewChatOnMongoDb = async (
  newChatInfo: any,
  endpointPath: string
) => {
  try {
    const { data } = await globalAxios({
      method: "POST",
      url: endpointPath,
      data: newChatInfo.chatInfo,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
      withCredentials: true,
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteChatOnMongoDb = async (
  newChatInfo: any,
  endpointPath: string
) => {
  try {
    console.log('deleteChatMongoDb')
    const {status} = await globalAxios({
      method: "DELETE",
      url: endpointPath,
      data: newChatInfo.chatInfo,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log(data)

    return status;
  } catch (err) {
    console.log(err);
  }
};

// import { getAccessToken } from "utils/accessToken";

// export const saveNewChatOnMongoDb = async (
//   newChatInfo: any,
//   endpointPath: string
// ) => {
//   try {
//     const data = await fetch(
//       `${process.env.REACT_APP_SERVER_URL}${endpointPath}`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//           authorization: `Bearer ${getAccessToken()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newChatInfo.chatInfo),
//       }
//     );
//     const res = await data.status;
//     console.log(res);
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };
