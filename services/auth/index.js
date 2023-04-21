import { PrismaClient } from "@prisma/client";
import { token } from "morgan";

const prisma = new PrismaClient();

const authService = {
  getAuth: async () => {
    const auth = await prisma.auth.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return auth;
  },

  register: async (data) => {
    const auth = await prisma.auth.create({
      data: {
        username: data.username,
        password: data.password,
        karyawanId: data.karyawan_id,
      },
    });

    return auth;
  },

  login: async (data) => {
    const auth = await prisma.auth.findUnique({
      where: {
        username: data.username,
      },
    });

    return auth;
  },

  updateToken: async (data) => {
    const auth = await prisma.auth.update({
      where: {
        id: data.id,
      },
      data: {
        updatedAt: new Date(),
        rememberToken: data.rememberToken,
      },
    });
  },

  verifyToken: async (data) => {
    const auth = await prisma.auth.findUnique({
      where: {
        id: data.id,
      },
    });

    return auth;
  },

  logout: async (data) => {
    const auth = await prisma.auth.update({
      where: {
        id: data.id,
      },
      data: {
        updatedAt: new Date(),
        rememberToken: null,
      },
    });
  },
};

export default authService;
