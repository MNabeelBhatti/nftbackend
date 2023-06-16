import { Router } from "express";
import userRoutes from "./users.routes.mjs";
import authRoutes from "./auth.routes.mjs";
import nftRoutes from './nft.routes.mjs';
import collectionRoutes from './collection.routes.mjs'


const router = Router();
router.get("/", (req, res) => {
  res.end("<h1>Welcome to NFTs!</h1>");
});
router.use("/auth", authRoutes);
//Authenticated
router.use("/users", userRoutes);
router.use("/nfts", nftRoutes);
router.use("/collections", collectionRoutes);




export default router;
