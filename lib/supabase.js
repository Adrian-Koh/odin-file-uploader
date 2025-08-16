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
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
    return data.publicUrl;
  }
}

module.exports = { uploadFile };
