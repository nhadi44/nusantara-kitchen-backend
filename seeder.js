import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const karyawan = [];

  for (let i = 0; i < 10; i++) {
    const user = {
      nik: faker.random.numeric(16),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      joinDate: faker.date.past(),
      endContract: faker.date.future(),
      photo: faker.image.avatar(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };

    karyawan.push(user);
  }

  await prisma.karyawan.createMany({
    data: karyawan,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
