// const fetch = require("node-fetch");
import FormData from "form-data";
import axios from "axios";
import { response } from "express";

type LoginEskizResponse = {
  email: string;
  password: string;
};
type smsResponse = {
  mobile_phone: string;
  message: string;
  from: string;
};

const authService = async (email: string, password: string) => {
  try {
    const reqBody = new FormData();

    reqBody.append("email", email);
    reqBody.append("password", password);

    return await axios
      .post<LoginEskizResponse>(
        "https://notify.eskiz.uz/api/auth/login",
        reqBody
      )
      .then(async (response: any) => {
        let data = await response.data;
        if (response.status >= 200 && response.status < 300) {
          data.success = true;
          return data;
        } else {
          data.success = false;
          return data;
        }
      });
  } catch (error) {
    console.log("Eskiz auth error", error);
  }
};

const sendSmsTo = async (phoneNumber: number, message: string) => {
  const authInfo = await authService(
    "noorgroupuz@gmail.com",
    "CXx3q0u2BSPATRVE227KspYiHkylTwrrnjuQVH5a"
  );

  if (!authInfo.success) {
    return authInfo;
  }

  const reqBody = new FormData();

  reqBody.append("mobile_phone", phoneNumber);
  reqBody.append("message", message);
  reqBody.append("from", 4546);

  return await axios
    .post<smsResponse>(
      "https://notify.eskiz.uz/api/message/sms/send",
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${authInfo.data.token}`,
        },
      }
    )
    .then(async (response: any) => {
      let data = await response.data;
      if (response.status >= 200 && response.status < 300) {
        data.success = true;
        return data;
      }
      data.success = false;
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default sendSmsTo;
