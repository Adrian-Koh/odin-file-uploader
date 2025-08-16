const { prisma } = require("../lib/prisma");

async function indexGet(req, res, next) {
  try {
    let folders = null;
    let files = null;
    if (req.user) {
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

    res.render("index", {
      links: req.links,
      folders,
      files,
    });
  } catch (err) {
    next(err);
  }
}

function failedAuthGet(req, res, next) {
  res.render("failedAuth", { links: req.links });
}

module.exports = {
  indexGet,
  failedAuthGet,
};
