import createHttpError from "http-errors";
import axios from "axios";
import { catchAsync } from "../utils/catchAsync.js";
import { userModel } from "../models/user.model.js";
import config from "../config/config.js";

const getUserData = async (token) => {
  const headers = {
    Authorization: `Token ${token}`,
  };
  const response = await axios.get(
    config.auth_url,
    { headers }
  );
  return response.data;
};

export const validateUser = catchAsync(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(" ")[1];
    const userData = await userModel.findOne({ token: token });
    if (userData) {
      req.payload = userData;
      next();
    } else {
      const response = await getUserData(token);
      const omitSingle = (key, { [key]: _, ...obj }) => obj;
      const result = omitSingle("pk", response);
      const newUser = await userModel.create({...result, token: token})
      req.payload = newUser
      next();
    }
  } else {
    throw createHttpError(401, "Authorization required");
  }
});
