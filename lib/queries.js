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

async function getSessions() {
  const sessions = await prisma.session.findMany();
  console.log(sessions);
}

async function getFolders() {
  const folders = await prisma.folder.findMany();
  console.log(folders);
}

getFolders()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
