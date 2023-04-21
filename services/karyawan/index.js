import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const karyawanService = {
  getKaryawan: async () => {
    const karyawan = await prisma.karyawan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return karyawan;
  },

  createKaryawan: async (data) => {
    const karyawan = await prisma.karyawan.create({
      data: data,
    })
  },

  getKaryawanById: async (id) => {
    const karyawan = await prisma.karyawan.findUnique({
      where: {
        id: id,
      },
    });
    return karyawan;
  },

  updateKaryawan: async (id, data) => {
    const karyawan = await prisma.karyawan.update({
      where: {
        id: id,
      },
      data: data,
    });
    return karyawan;
  },

  deleteKaryawan: async (id) => {
    const karyawan = await prisma.karyawan.delete({
      where: {
        id: id,
      },
    });
    return karyawan;
  },
};

export default karyawanService;
