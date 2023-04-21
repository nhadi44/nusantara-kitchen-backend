import authService from "../../services/auth/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

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

  login: async (req, res) => {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const auth = await authService.login(data);
      if (!auth) {
        return res.status(400).json({
          status: "error",
          message: "Invalid username or password",
        });
      }
      const validPassword = await bcrypt.compare(data.password, auth.password);
      if (!validPassword) {
        return res.status(400).json({
          status: "error",
          message: "Invalid username or password",
        });
      }
      const token = jwt.sign(
        {
          id: auth.id,
        },
        process.env.JWT_SECRET,
        //token expires in 1 day
        { expiresIn: "1d" }
      );

      await authService.updateToken({
        id: auth.id,
        rememberToken: token,
      });

      res.status(200).json({
        status: "success",
        message: "Login success",
        data: {
          token: token,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Login failed",
        data: error.message,
      });
    }
  },

  verifyToken: async (req, res) => {
    // get data from header
    const token = req.headers["authorization"];

    if (!token)
      res.status(401).json({
        status: "error",
        message: "Access denied. No token provided",
      });

    // verify token from header
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // verify token from database
      const auth = await authService.verifyToken({
        id: decoded.id,
      });

      if (!auth)
        res.status(401).json({
          status: "error",
          message: "Access denied. Invalid token",
        });

      if (auth.remember_token !== token)
        res.status(401).json({
          status: "error",
          message: "Access denied. Invalid token",
        });
        
      res.status(200).json({
        status: "success",
        message: "Token verified",
        data: auth,
      });
    } catch (error) {
      // if jwt token expired
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          status: "token_expired",
          message: "Access denied. Token expired",
        });
      }
      res.status(401).json({
        status: "error",
        message: "Access denied. Invalid token",
      });
    }
  },

  logout: async (req, res) => {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const auth = await authService.logout({
        id: decoded.id,
      });
      res.status(200).json({
        status: "success",
        message: "Logout success",
        data: auth,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Logout failed",
        data: error.message,
      });
    }
  },
};

export default authController;
