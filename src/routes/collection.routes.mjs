import { authenticate,upload } from "#middleware";
import { Router } from "express";
import { collectionsController } from "#controller";

const router = Router();

router.get("/", collectionsController.getAllCollections);
router.post("/create",  upload.fields([
    { name: 'thumbnail_path', maxCount: 1 },
    { name: 'file_path', maxCount: 1 },
  ]), collectionsController.createCollection);
router.get(
  "withWallet/:wallet_addr",
  
  collectionsController.getWalletAddrCollections
);
router.get("/:id",  collectionsController.getOneCollection);

export default router;
