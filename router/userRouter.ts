import express, { Router } from "express";
import {
  changePasswordUser,
  createUser,
  deleteOneUser,
  getOneUser,
  getUser,
  passwordRequest,
  updateUser,
  verifyUser,
} from "../controller/userController";

const router: Router = express.Router();

router.route("/").get(getUser);
router.route("/:id").get(getOneUser);
router.route("/:id").delete(deleteOneUser);
router.route("/:id").patch(updateUser);
router.route("/:id/verified").post(verifyUser);
router.route("/create").post(createUser);
router.route("/reset-password").post(passwordRequest);

router.route("/:id/:token/reset-password").post(changePasswordUser);

export default router;
