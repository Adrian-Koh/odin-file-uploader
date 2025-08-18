const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://xngztpgfiwfxejioajkg.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = "File Uploader App";

async function uploadFile(fileName, fileContent, folder = null) {
  let filePath = fileName;
  if (folder) {
    filePath = `${folder}/${fileName}`;
  }
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, fileContent, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.log(JSON.stringify(error));
    throw error;
  } else {
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return data.publicUrl;
  }
}

async function downloadFile(fileName, folder = null) {
  let filePath = fileName;
  if (folder) {
    filePath = `${folder}/${fileName}`;
  }

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .download(filePath);

  if (error) {
    throw error;
  } else {
    return data;
  }
}

async function deleteFile(fileName, folder = null) {
  let filePath = fileName;
  if (folder) {
    filePath = `${folder}/${fileName}`;
  }

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    throw error;
  }
}

async function deleteFolder(folder) {
  if (!folder) {
    throw new Error("Folder is null");
  }

  let foldersResult = await supabase.storage.from(BUCKET_NAME).list(folder);

  if (foldersResult.error) {
    throw foldersResult.error;
  } else {
    const files = [];
    for (const fileData of foldersResult.data) {
      files.push(`${folder}/${fileData.name}`);
    }

    let removeResult = await supabase.storage.from(BUCKET_NAME).remove(files);

    if (removeResult.error) {
      throw removeResult.error;
    }
  }
}

async function editFolder(oldName, newName) {
  if (!oldName || !newName) {
    throw new Error("Folder old name / new name is null");
  }

  let foldersResult = await supabase.storage.from(BUCKET_NAME).list(oldName);

  if (foldersResult.error) {
    throw foldersResult.error;
  } else {
    for (const fileData of foldersResult.data) {
      const copyResult = await supabase.storage
        .from(BUCKET_NAME)
        .move(`${oldName}/${fileData.name}`, `${newName}/${fileData.name}`);

      if (copyResult.error) {
        throw copyResult.error;
      }
    }
  }
}

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile,
  deleteFolder,
  editFolder,
};
