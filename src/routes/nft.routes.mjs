import { authenticate } from "#middleware";
import { Router } from "express";
import { nftController } from "#controller";

const router = Router();

router.post("/create", nftController.createNft);
router.get("/:wallet_addr", nftController.getNfts);





export default router;
