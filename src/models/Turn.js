import { Schema, model } from "mongoose";

const turnSchema = new Schema({
  startDateTime: {
    type: Date,
    required: true,
  },
  dog: {
    type: Schema.Types.ObjectId,
    ref: "Dog",
    required: true,
  },
  groomer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model("Turn", turnSchema);
