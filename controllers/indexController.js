const { prisma } = require("../lib/prisma");
const { links } = require("../lib/navLinks");
const { supabase } = require("../lib/supabase");

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

    const { data, error } = await supabase.storage.listBuckets();

    console.log("data: " + JSON.stringify(data));
    console.log("error: " + JSON.stringify(error));

    res.render("index", { links, folders, files });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  indexGet,
};
