import { model, Schema } from "mongoose";

const notificationSchema = new Schema({
  user: {
    type:Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
});

export const Notification = model("Notification", notificationSchema);
