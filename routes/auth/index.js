import express from "express";
import authController from "../../controllers/auth/index.js";
import { body, validationResult } from "express-validator";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  authController.getAuth(req, res);
});

authRouter.post(
  "/register",
  body("username").notEmpty().withMessage("Username is required"),
  body("username")
    .isLength({ max: 20 })
    .withMessage("Username can't be longer than 20 characters"),
  body("username")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Username can't space characters"),

  body("password").notEmpty().withMessage("Password is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
    .withMessage(
      "Password must have at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
    ),

  body("karyawan_id").notEmpty().withMessage("Karyawan ID is required"),
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ errors: error.array() });
    }
    authController.register(req, res);
  }
);

export default authRouter;
