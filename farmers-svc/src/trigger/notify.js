import { logger, task, wait } from "@trigger.dev/sdk/v3";
import { Notification } from "../models/Notification.js";
import { suggestCrop } from "../utils/suggestCrops.js";
import { createSuggestion } from "../utils/addSuggestion.js";

export const notifyTask = task({
  id: "notify-user",
  maxDuration: 500,
  run: async (payload, { ctx }) => {
    logger.log("notify-user", { payload, ctx });
    const token = await Notification.findOne({ user: payload.userId });
    if (!token) {
      logger.log("notify-us: token not found");
      return { message: "error, token does not exist" };
    }
    // const expo = new Expo();
    try {
      const geminiRes = await suggestCrop(
        payload.location,
        payload.moisture,
        payload.nitrogen,
        payload.phosphorus,
        payload.potassium,
        payload.ph
      );

      logger.log("notify-us: gemini  done");
      const resp = await createSuggestion(payload.farmId, geminiRes);
      if (!resp.status) {
        throw new Error(resp.message);
      }
      console.log("suggestion saved");
      logger.log("notify-us: suggestion created");
      const message = {
        to: token.token,
        sound: "default",
        title: "Crops suggestion",
        body: "Your crops suggestion report is complete",
        data: {
          screen: "Notifications",
          farmId: payload.farmId,
          response: geminiRes,
        },
      };
      console.log("suggestion sending");

      const res = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (res.ok) {
        console.log("sent message");
        logger.log("notify-us: notification sent");
        return { message: "Notification sent", tickets };
      }
      console.log("Expo Response:", res.ok);
      const datas = await res.json();
      console.log("Expo Data:", datas);
      // let tickets = await expo.sendPushNotificationsAsync([message]);
    } catch (error) {
      return { message: error.message };
    }
  },
});
