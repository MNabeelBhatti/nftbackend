// import { getNftTokens } from "../utils/nft.mjs";
const address = "0x98AB2C86d43528Fc3E625D6762c20Bd6600471cb";
import { Nft } from "../models/index.mjs";
import { ImageUpload } from "../services/cloudinary.mjs";
export const createNft = async (req, res, next) => {
  let nftData = req.body;
  try {
    const file_path = await ImageUpload(req.files["file_path"][0].path);
    const thumbnail_path = await ImageUpload(
      req.files["thumbnail_path"][0].path
    );
    let nft = await Nft.create({
      ...nftData,
      file_path,
      thumbnail_path,
    }).lean();
    return res.json({
      message: "nft create  Successfully!",
      payload: nft,
    });
  } catch (error) {
    next(error);
  }
};

export const getNfts = async (req, res, next) => {
  let {wallet_addr}=req.params
  try {
     let nfts=await Nft.find({wallet_addr}).lean()
    return res.json({
      message: "Nfts Fetch Successfully!",
      payload: nfts,
    });
  } catch (error) {
    next(error);
  }
};