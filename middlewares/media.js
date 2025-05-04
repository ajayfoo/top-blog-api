import { supabase } from "../libs/db.js";

/** @type {import("express").RequestHandler} */
const updateFileUrlsInPostBody = async (req, res, next) => {
  const urls = [];
  for (const file of req.files) {
    const b = file.buffer;
    let fileArraybuffer = b.slice(b.byteOffset, b.byteOffset + b.byteLength);
    const { data, error } = await supabase.storage
      .from("public-images")
      .upload("anImage4", fileArraybuffer, {
        contentType: file.mimetype,
      });
    if (error) {
      res.sendStatus(500);
      return;
    }
    const url = supabase.storage.from("public-images").getPublicUrl(data.path);
    urls.push(url);
  }
  next();
};

export { updateFileUrlsInPostBody };
