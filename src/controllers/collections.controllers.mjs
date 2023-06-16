import { Collections } from "../models/index.mjs";
import { ImageUpload } from "../services/cloudinary.mjs";
export const createCollection = async (req, res, next) => {
  let collectionData = req.body;
  try {
    const file_path = await ImageUpload(req.files["file_path"][0].path);
    const thumbnail_path = await ImageUpload(
      req.files["thumbnail_path"][0].path
    );
    let collection = await Collections.create({
      ...collectionData,
      file_path,
      thumbnail_path,
    }).lean();
    return res.json({
      message: "collection create  Successfully!",
      payload: collection,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllCollections = async (req, res, next) => {
  try {
    let collections = await Collections.find()
      .populate("nfts")
      .lean();
    return res.json({
      message: "collections fetch  Successfully!",
      payload: collections,
    });
  } catch (error) {
    next(error);
  }
};
export const getWalletAddrCollections = async (req, res, next) => {
  const { wallet_addr } = req.params;
  try {
    let collections = await Collections.find({ wallet_addr })
      .populate("nfts")
      .sort({ createdAt: -1 })
      .lean();
    return res.json({
      message: "collections fetch  Successfully!",
      payload: collections,
    });
  } catch (error) {
    next(error);
  }
};
export const getOneCollection = async (req, res, next) => {
  const { id } = req.params;
  try {
    let collection = await Collections.findById(id).lean();
    return res.json({
      message: "collection create  Successfully!",
      payload: collection,
    });
  } catch (error) {
    next(error);
  }
};
