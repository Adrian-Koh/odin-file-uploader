const { prisma } = require("../lib/prisma");
const { deleteFolder, editFolder, getFileUrl } = require("../lib/supabase");

function newFolderGet(req, res) {
  res.render("formContainer", {
    title: "New folder",
    formName: "folder",
    links: req.links,
    postLink: "/folder/new",
  });
}

async function newFolderPost(req, res, next) {
  try {
    const { folder } = req.body;

    const createdFolder = await prisma.folder.create({
      data: {
        name: folder,
        userId: req.user.id,
      },
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

async function folderGet(req, res) {
  const { folderId } = req.params;
  const folder = await prisma.folder.findUnique({
    where: {
      id: parseInt(folderId),
    },
  });
  const files = await prisma.file.findMany({
    where: {
      userId: req.user.id,
      folderId: parseInt(folderId),
    },
  });
  res.render("folder", {
    folder,
    files,
    links: req.links,
  });
}

async function folderDeleteGet(req, res, next) {
  const { folderId } = req.params;
  await prisma.file.deleteMany({
    where: {
      folderId: parseInt(folderId),
    },
  });
  const deletedFolder = await prisma.folder.delete({
    where: {
      id: parseInt(folderId),
    },
  });

  await deleteFolder(deletedFolder.name);

  res.redirect("/");
}

async function editFolderGet(req, res, next) {
  const { folderId } = req.params;
  const folder = await prisma.folder.findUnique({
    where: {
      id: parseInt(folderId),
    },
  });
  res.render("formContainer", {
    title: "Update folder",
    formName: "folder",
    links: req.links,
    postLink: "/folder/edit/" + folderId,
    folderName: folder.name,
  });
}

async function editFolderPost(req, res, next) {
  try {
    const { folder } = req.body;
    const { folderId } = req.params;

    let folderObj = await prisma.folder.findUnique({
      where: {
        id: parseInt(folderId),
      },
    });
    const oldName = folderObj.name;

    await prisma.folder.update({
      where: {
        id: parseInt(folderId),
      },
      data: {
        name: folder,
      },
    });

    await editFolder(oldName, folder);

    // update url of files
    const files = await prisma.file.findMany({
      where: {
        folderId: parseInt(folderId),
      },
    });

    for (const file of files) {
      let filePath = `${folder}/${file.name}`;
      let fileUrl = getFileUrl(filePath);
      await prisma.file.update({
        where: {
          id: parseInt(file.id),
        },
        data: {
          url: fileUrl,
        },
      });
    }

    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  newFolderGet,
  newFolderPost,
  folderGet,
  folderDeleteGet,
  editFolderGet,
  editFolderPost,
};
