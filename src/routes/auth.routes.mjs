import { Router } from "express";
const router = Router();
import { validator } from "#middleware";
import { userValidation } from "#validation";
import { userController } from "#controller";

router.post("/login", userController.login);
router.post(
  "/loginWithWallet",
  validator(userValidation.createUserwithWalletAddress),
  userController.loginWithWalletAddr
);
router.post(
  "/createWithWallet",
  validator(userValidation.createUserwithWalletAddress),
  userController.createWithWalletAddr
);

//@route    POST auth/signup
//@desc     Sign up user (create user account)
//@access   Public
router.post(
  "/signup",
  validator(userValidation.createUser),
  userController.signup
);

export default router;
