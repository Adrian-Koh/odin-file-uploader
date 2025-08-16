const { prisma } = require("../lib/prisma");
const { getLinks } = require("../lib/navLinks");

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
      links: getLinks(req.isAuthenticated()),
      folders,
      files,
    });
  } catch (err) {
    next(err);
  }
}

function failedAuthGet(req, res) {
  res.render("failedAuth", { links: getLinks(false) });
}

module.exports = {
  indexGet,
  failedAuthGet,
};
