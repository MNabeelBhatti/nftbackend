import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      default: null
    },
    password: {
      type: String,
      default: null
      // required: true,
    },
    last_login: { type: Date, default: null },
    is_superuser: { type: Boolean, default: false },
    username: {
      type: String,
      // required: true,
      unique: true,
      default: null
    },
    first_name: { type: String, default: null },
    wallet_addr: { type: String,required: true,default: null },
    banner_file: { type: String, default: null },
    profile_image: { type: String, default: null },
    last_name: { type: String, default: null },
    is_staff: { type: Boolean, default: true },
    is_active: { type: Boolean, default: false },
    date_joined: { type: Date, default: new Date() },
    total_earnings: { type: Number, default: null },
    amount_spent: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
