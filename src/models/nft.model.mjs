import mongoose from "mongoose";
const { Schema, model } = mongoose;

const nftSchema = new Schema(
  {
    
    file_path: { type: String ,required: true,},
    name: { type: String },
    description: { type: String },
    external_link: { type: String },
    properties: { type: String },
    states: { type: String },
    unlockable_content: { type: Boolean },
    sensitive_content: { type: Boolean },
    supply_count: { type: Number },
    thumbnail_path: { type: String,required: true, },
    current_bid: { type: Number },
    on_sale: { type: Boolean },
    number_of_bid_days: { type: Number },
    wallet_addr: {
        type: String,
        default: null,
      },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    collection_id: { type: mongoose.Schema.Types.ObjectId, ref: "Collections" },
    deployed_on: { type: String },
    approval_hash: { type: String },
    owner: { type: String },
    mint_transaction_hash: { type: String },
    contract_address: { type: String },
    volume: { type: Number, default: 0.0 },
    minting_price: { type: Number },
    minted_at: { type: Date },
    tokenid: { type: Number, },
  },
  {
    timestamps: true,
  }
);

export default model("Nft", nftSchema);
// product_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },