import mongoose from "mongoose";
const { Schema, model } = mongoose;

const collectionSchema = Schema({
    file_path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: null,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thumbnail_path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    nfts: [{
      type: Schema.Types.ObjectId,
      ref: 'Collections'
    }],
    your_site: {
      type: String,
      default: null,
    },
    discord: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    medium: {
      type: String,
      default: null,
    },
    telegram_group: {
      type: String,
      default: null,
    },
    facebook: {
      type: String,
      default: null,
    },
    whatsapp_group: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    creator_earning: {
      type: Number,
      default: null,
    },
    sensitive_content: {
      type: Boolean,
      default: null,
    },
    blockchain: {
      type: String,
      default: null,
    },
    wallet_addr: {
      type: String,
      default: null,
    },
    contract_address: {
      type: String,
      default: null,
    },
    transaction_hash: {
      type: String,
      default: null,
    },
    collection_approval_hash: {
      type: String,
      default: null,
    },
    creator: {
      type: String,
      default: null,
    },
    floor_price: {
      type: Number,
      default: null,
    },
    volume: {
      type: Number,
      default: 0.0,
    },
},
  {
    timestamps: true,
  }
);

export default model("Collections", collectionSchema);
