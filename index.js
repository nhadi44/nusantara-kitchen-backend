import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import karyawanRoutes from "./routes/karyawan/index.js";
import authRoutes from "./routes/auth/index.js";

dotenv.config();

const app = express();
const port = dotenv.config().parsed.APP_PORT;
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("combined"));

router.use("/karyawan", karyawanRoutes);
router.use("/auth", authRoutes);

app.use("/api/nusantara-kitchen", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
