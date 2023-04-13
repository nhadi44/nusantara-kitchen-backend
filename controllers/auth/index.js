import authService from "../../services/auth/index.js";
import bcrypt from "bcrypt";

const authController = {
  getAuth: async (req, res) => {
    try {
      const auth = await authService.getAuth();
      res.status(200).json({
        status: "success",
        message: "Get auth success",
        data: auth,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Get auth failed",
        data: error,
      });
    }
  },

  register: async (req, res) => {
    const data = {
      username: req.body.username,
      password: req.body.password,
      karyawan_id: req.body.karyawan_id,
    };
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    try {
      const auth = await authService.register(data);
      res.status(201).json({
        status: "success",
        message: "Register success",
        data: auth,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Register failed",
        data: error.message,
      });
    }
  },
};

export default authController;
