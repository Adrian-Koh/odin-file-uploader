const { PrismaClient } = require("../generated/prisma");
const { links } = require("../lib/navLinks");

async function indexGet(req, res, next) {
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

    res.render("index", { links, folders, files });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  indexGet,
};
