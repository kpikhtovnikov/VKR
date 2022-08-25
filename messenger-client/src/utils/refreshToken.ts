import { setAccessToken } from "./accessToken";

export const refreshToken = async () => {
  try {
    const data = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/refresh-token`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await data.json();
    console.log(res);
    if (res.accessToken) setAccessToken(res.accessToken);
    // setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…Q1MX0.txu1S-AlwHmf0Kgt4aSLEnj1WE4gP-O2ueyMTU41haI');
  } catch (err) {
    console.log(err);
  }
};
