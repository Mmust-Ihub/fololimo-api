import axios from "axios";
import config from "../config/config.js";
import querystring from "querystring"

export const sendSMS = async (phoneNumbers, message, from="AFRICASTKNG") => {
  const headers = {
    "apiKey": config.apikey,
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json",
  };

  const body = querystring.stringify({
    username: config.username,
    message: message,
    to: phoneNumbers.split(","),
    from: from
  });
  const response = await axios.post(config.url, body, { headers });
  const resp = await response.data.SMSMessageData.Recipients
  return resp;
};


sendSMS("+254743596183", "Hello there",)