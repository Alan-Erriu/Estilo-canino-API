import { Schema, model } from "mongoose";

const turnSchema = new Schema({
  date: {
    // 01 - 31
    type: String,
    maxlength: 2,
  },
  month: {
    // 00 - 11
    type: String,
    maxlength: 2,
  },
  year: {
    // 2023
    type: String,
    maxlength: 4,
  },
  day: {
    // 0 a 6
    type: String,
    maxlength: 1,
  },
  time: {
    // 09:15
    type: String,
    maxlength: 5,
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
  availability: {
    type: Boolean,
    default: true,
  },
  state: {
    type: String,
    enum: ["reservado", "cancelado"],
    default: "reservado",
  },
});
export default model("Turn", turnSchema);
