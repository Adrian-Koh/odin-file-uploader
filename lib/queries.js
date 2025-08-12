const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user.findMany();
  console.log(users);
}

async function getFiles() {
  const files = await prisma.file.findMany();
  console.log(files);
}

getFiles()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
