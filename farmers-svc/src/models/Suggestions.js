import { Schema, model } from "mongoose";

const suggestionSchema = new Schema(
  {
    farmId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Farm",
    },
    suggestion: {
      required: true,
      type: {},
    },
  },
  { timestamps: true }
);
suggestionSchema.index({ createdAt: -1 });
export const Suggestion = model("Suggestion", suggestionSchema);
