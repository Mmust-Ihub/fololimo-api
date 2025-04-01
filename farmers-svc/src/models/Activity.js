import mongoose, { Schema, Types, model } from "mongoose";

const activitySchema = new Schema({
  farmId: {
    type: Types.ObjectId,
    required: true,
    ref: "Farm",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  color: {
    type: String,
    default: "blue-500",
  },
});

async function getFarmIdsByUserId(userId) {
  const farms = await mongoose
    .model("Farm")
    .find({ owner: userId })
    .select("_id");
  return farms.map((farm) => farm._id);
}

activitySchema.statics.getUpcomingActivitiesByUser = async function (
  userId,
  page = 1,
  limit = 10
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.find({
    farmId: { $in: farmIds },
    endDate: { $gt: new Date() },
  })
    .populate("farmId", "name")
    .skip((page - 1) * limit)
    .limit(limit);
};

activitySchema.statics.getPastActivitiesByUser = async function (
  userId,
  page = 1,
  limit = 10
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.find({
    farmId: { $in: farmIds },
    endDate: { $lt: new Date() },
  })
    .populate("farmId", "name")
    .skip((page - 1) * limit)
    .limit(limit);
};

activitySchema.statics.getUserActivityCount = async function (
  userId
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.find({ farmId: { $in: farmIds } })
    .countDocuments()
};
activitySchema.statics.getActivitiesByUserId = async function (
  userId,
  page = 1,
  limit = 10
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.find({ farmId: { $in: farmIds } })
    .populate("farmId", "name")
    .skip((page - 1) * limit)
    .limit(limit);
};

activitySchema.statics.getActivitiesByFarmIdAndUser = async function (
  userId,
  farmId
) {
  const farmIds = await getFarmIdsByUserId(userId);
  if (!farmIds.includes(farmId)) return [];
  return this.find({ farmId }).populate("farmId", "name");
};

activitySchema.statics.getActivityByIdAndUser = async function (
  userId,
  activityId
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.findOne({ _id: activityId, farmId: { $in: farmIds } }).populate(
    "farmId",
    "name"
  );
};

export const Activity = model("Activity", activitySchema);
