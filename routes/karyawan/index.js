import express from "express";
import karyawanController from "../../controllers/karyawan/index.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/get-all-karyawan", (req, res) => {
  karyawanController.getKaryawan(req, res);
});

router.post(
  "/create-karyawan",
  body("nik").notEmpty().withMessage("NIK is required"),
  body("nik").isNumeric().withMessage("NIK must be a number"),
  body("nik")
    .isLength({ min: 16, max: 16 })
    .withMessage("NIK must be 16 digits"),

  body("firstname").notEmpty().withMessage("Firstname is required"),
  body("lastname").notEmpty().withMessage("Lastname is required"),
  body("phonenumber").notEmpty().withMessage("Phonenumber is required"),
  body("phonenumber").isNumeric().withMessage("Phonenumber must be a number"),
  body("phonenumber")
    .isLength({ min: 10, max: 13 })
    .withMessage("Phonenumber must be between 10 and 13 digits"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("joindate").notEmpty().withMessage("Join date is required"),
  body("endcontract").notEmpty().withMessage("End contract is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("photo").notEmpty().withMessage("Photo is required"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    karyawanController.createKaryawan(req, res);
  }
);

router.get(
  "/get-karyawan",
  body("id").notEmpty().withMessage("ID is required"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    karyawanController.getKaryawanById(req, res);
  }
);

router.put(
  "/update-karyawan",
  body("id").notEmpty().withMessage("ID is required"),
  body("nik").notEmpty().withMessage("NIK is required"),
  body("nik").isNumeric().withMessage("NIK must be a number"),
  body("nik")
    .isLength({ min: 16, max: 16 })
    .withMessage("NIK must be 16 digits"),

  body("firstname").notEmpty().withMessage("Firstname is required"),
  body("lastname").notEmpty().withMessage("Lastname is required"),
  body("phonenumber").notEmpty().withMessage("Phonenumber is required"),
  body("phonenumber").isNumeric().withMessage("Phonenumber must be a number"),
  body("phonenumber")
    .isLength({ min: 10, max: 13 })
    .withMessage("Phonenumber must be between 10 and 13 digits"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("joindate").notEmpty().withMessage("Join date is required"),
  body("endcontract").notEmpty().withMessage("End contract is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("photo").notEmpty().withMessage("Photo is required"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    karyawanController.updateKaryawan(req, res);
  }
);

router.delete(
  "/delete-karyawan",
  body("id").notEmpty().withMessage("ID is required"),
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ errors: error.array() });
    }
    karyawanController.deleteKaryawan(req, res);
  }
);

export default router;
