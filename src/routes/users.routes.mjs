import { authenticate } from "#middleware";
import { Router } from "express";
import { userController } from "#controller";
import { validator } from "#middleware";
import { userValidation } from "#validation";
const router = Router();

router.get("/", authenticate,userController.getAllUsers);
router.get("/:id", authenticate,userController.getOneUser);
router.get("/:wallet_addr", authenticate,userController.getUserWithWalletAddr);
router.put("/:id", authenticate,userController.updateUser);
router.delete("/:id", authenticate,userController.deleteUser);



export default router;
