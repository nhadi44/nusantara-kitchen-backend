import moment from "moment";
import karyawanService from "../../services/karyawan/index.js";
import { body, validationResult } from "express-validator";

const karyawanController = {
  getKaryawan: async (req, res) => {
    try {
      const karyawan = await karyawanService.getKaryawan();
      res.status(200).json({
        status: "success",
        message: "Get karyawan success",
        data: karyawan,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Get karyawan failed",
        data: error,
      });
    }
  },

  createKaryawan: async (req, res) => {
    const data = {
      nik: req.body.nik,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      phoneNumber: req.body.phonenumber,
      email: req.body.email,
      address: req.body.address,
      joinDate: req.body.joindate,
      endContract: req.body.endcontract,
      photo: req.body.photo,
    };

    try {
      const karyawan = await karyawanService.createKaryawan(data);
      res.status(201).json({
        status: "success",
        message: "Create karyawan success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Create karyawan failed",
        data: error.message,
      });
    }
  },
  getKaryawanById: async (req, res) => {
    const id = req.body.id;
    try {
      const karyawan = await karyawanService.getKaryawanById(id);

      if (!karyawan)
        return res.status(404).json({
          status: "error",
          message: "Karyawan not found",
        });

      res.status(200).json({
        status: "success",
        message: "Get karyawan success",
        data: karyawan,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Get karyawan failed",
        data: error,
      });
    }
  },

  updateKaryawan: async (req, res) => {
    const data = {
      id: req.body.id,
      nik: req.body.nik,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      phoneNumber: req.body.phonenumber,
      email: req.body.email,
      address: req.body.address,
      joinDate: req.body.joindate,
      endContract: req.body.endcontract,
      photo: req.body.photo,
    };

    try {
      const karyawan = await karyawanService.updateKaryawan(data.id, data);

      if (!karyawan)
        return res.status(404).json({
          status: "error",
          message: "Karyawan not found",
        });

      res.status(200).json({
        status: "success",
        message: "Update karyawan success",
        data: karyawan,
      });
    } catch (error) {
      const message = error.message;
      // convert error message to array and convert to string
      const errorMessage = message.split(",").toString();
      res.status(500).json({
        status: "error",
        message: "Update karyawan failed",
        data: errorMessage,
      });
    }
  },

  deleteKaryawan: async (req, res) => {
    const id = req.body.id;
    try {
      const karyawan = await karyawanService.deleteKaryawan(id);
      res.status(200).json({
        status: "success",
        message: "Delete karyawan success",
        data: karyawan,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Delete karyawan failed",
        data: error.message,
      });
    }
  },
};

export default karyawanController;
