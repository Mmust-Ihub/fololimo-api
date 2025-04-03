import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  model: String, // Model name (e.g., "Farm")
  count: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model("Counter", counterSchema);


const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pk:{
    type: Number,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  location: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  geolocation: {
    type: {},
  },
});

farmSchema.pre("save", async function (next) {
  if (!this.pk) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Farm" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.pk = counter.count;
  }
  next();
});

export const Farm = mongoose.model("Farm", farmSchema);
