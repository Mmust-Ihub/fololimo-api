import mongoose from "mongoose";
const farmingActivitySchema = new mongoose.Schema({
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: true,
    description: "Reference to the farm associated with this activity",
  },
  name: {
    type: String,
    required: true,
    description: "Name of the farming activity",
  },
  startDate: {
    type: Date,
    required: true,
    description: "Start date of the activity in ISO 8601 format",
  },
  duration: {
    type: String,
    required: true,
    description: "Duration of the activity in days",
  },
  cost: {
    type: String,
    required: true,
    description: "Estimated cost range for the activity",
  },
  description: {
    type: String,
    required: true,
    description: "Brief explanation of the activity",
  },
});

async function getFarmIdsByUserId(userId) {
  const farms = await mongoose
    .model("Farm")
    .find({ owner: userId })
    .select("_id");
  return farms.map((farm) => farm._id);
}

farmingActivitySchema.statics.getUpcomingActivitiesByUser = async function (
  userId,
  page = 1,
  limit = 10
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.find({
    farmId: { $in: farmIds },
    startDate: { $gt: new Date() },
  })
    .populate("farmId", "name")
    .skip((page - 1) * limit)
    .limit(limit);
};

farmingActivitySchema.statics.getPastActivitiesByUser = async function (
  userId,
  page = 1,
  limit = 10
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.find({
    farmId: { $in: farmIds },
    startDate: { $lt: new Date() },
  })
    .populate("farmId", "name")
    .skip((page - 1) * limit)
    .limit(limit);
};

farmingActivitySchema.statics.getUserActivityCount = async function (
  userId
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.find({ farmId: { $in: farmIds } })
    .countDocuments()
};
farmingActivitySchema.statics.getActivitiesByUserId = async function (
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

farmingActivitySchema.statics.getActivitiesByFarmIdAndUser = async function (
  userId,
  farmId
) {
  const farmIds = await getFarmIdsByUserId(userId);
  if (!farmIds.includes(farmId)) return [];
  return this.find({ farmId }).populate("farmId", "name");
};

farmingActivitySchema.statics.getActivityByIdAndUser = async function (
  userId,
  activityId
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.findOne({ _id: activityId, farmId: { $in: farmIds } }).populate(
    "farmId",
    "name"
  );
};


export const FarmingActivity = mongoose.model(
  "FarmingActivity",
  farmingActivitySchema
);
