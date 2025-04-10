import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    history: [
      {
        role: {
          type: String,
          enum: ["user", "model", "system"],
          required: true,
        },
        parts: [
          {
            text: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
chatSchema.path("history").schema.set("_id", false);
chatSchema.path('history').schema.eachPath((path) => {
  if (path === 'parts') {
    chatSchema.path('history').schema.path('parts').options._id = false;
  }
});

export const Chat = mongoose.model("Chat", chatSchema);
