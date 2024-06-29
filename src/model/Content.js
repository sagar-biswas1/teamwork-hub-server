const mongoose = require("mongoose");
const { Schema } = mongoose;
const contentSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    body: { type: String, default: "" },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "createdBy filed is required"],
    },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);
