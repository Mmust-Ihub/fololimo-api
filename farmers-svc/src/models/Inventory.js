import { model, Schema, Types } from "mongoose";

const inventorySchema = Schema(
  {
    farmId: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
  },
  { timestamps: true }
);

async function getFarmIdsByUserId(userId) {
  const farms = await mongoose
    .model("Farm")
    .find({ owner: userId })
    .select("_id");
  return farms.map((farm) => farm._id);
}

inventorySchema.statics.getInventoryByUserId = async function (
  userId,
  page = 1,
  limit = 10
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.find({
    farmId: { $in: farmIds },
  })
    .populate("farmId", "name")
    .skip((page - 1) * limit)
    .limit(limit);
};
inventorySchema.statics.getInventoryByType = async function (
  userId,
  type,
  page = 1,
  limit = 10
) {
  const farmIds = await getFarmIdsByUserId(userId);
  return this.find({
    farmId: { $in: farmIds },
    transactionType: type
  })
    .populate("farmId", "name")
    .skip((page - 1) * limit)
    .limit(limit);
};

inventorySchema.statics.getInventoryBYFarmId = function (
  farmId,
  page = 1,
  limit = 10
) {
  {
    return this.find({
      farmId: farmId,
    })
      .populate("farmId", "name")
      .skip((page - 1) * limit)
      .limit(limit);
  }
};

export const Inventory = model("Inventory", inventorySchema);
