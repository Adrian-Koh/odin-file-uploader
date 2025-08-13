const { PrismaClient } = require("../generated/prisma");
const { links } = require("../lib/navLinks");

async function indexGet(req, res) {
  try {
    let folders = null;
    let files = null;
    if (req.user) {
      const prisma = new PrismaClient();
      folders = await prisma.folder.findMany({
        where: {
          userId: req.user.id,
        },
      });
      files = await prisma.file.findMany({
        where: {
          userId: req.user.id,
          folder: null,
        },
      });
    }
    console.log("files[0].name: " + files[0].name);

    res.render("index", { links, folders, files });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  indexGet,
};
