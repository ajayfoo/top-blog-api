import { supabase } from "../libs/db.js";

/** @type {import("express").RequestHandler} */
const updateFileUrlsInPostBody = async (req, res, next) => {
  const urls = [];
  for (const file of req.files) {
    const b = file.buffer;
    let fileArraybuffer = b.slice(b.byteOffset, b.byteOffset + b.byteLength);
    const filePath = crypto.randomUUID();
    const { data, error } = await supabase.storage
      .from("public-images")
      .upload(filePath, fileArraybuffer, {
        contentType: file.mimetype,
      });
    if (error) {
      res.sendStatus(500);
      return;
    }
    const url = supabase.storage.from("public-images").getPublicUrl(data.path);
    urls.push(url.data.publicUrl);
  }

  console.log("Request body:-");
  console.log(req.body);

  console.log("Request body:-");
  console.log(req.files);

  console.log("Replacement urls:-");
  console.log(urls);

  for (const url of urls) {
    req.body.body = replaceFirstOccuranceOfBlobUrl(req.body.body, url);
  }
  next();
};

const replaceFirstOccuranceOfBlobUrl = (stringWithBlogUrl, replacementUrl) => {
  const blogUrlBeginIndex = stringWithBlogUrl.indexOf('"blob:');
  if (blogUrlBeginIndex === -1) {
    console.warn(`string '"blob:' not found in ${stringWithBlogUrl}`);
    console.warn(`The image ${replacementUrl} will not be shown in the post`);
    return stringWithBlogUrl;
  }
  console.log(
    `Replacing first blob in ${stringWithBlogUrl} with ${replacementUrl}`
  );
  const blogUrlEndIndex = stringWithBlogUrl.indexOf('"', blogUrlBeginIndex + 1);
  return (
    stringWithBlogUrl.substring(0, blogUrlBeginIndex + 1) +
    replacementUrl +
    stringWithBlogUrl.substring(blogUrlEndIndex)
  );
};

export { updateFileUrlsInPostBody };
