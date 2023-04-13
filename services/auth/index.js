import { PrismaClient } from "@prisma/client";

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
};

export default authService;
