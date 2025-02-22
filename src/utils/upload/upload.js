const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.ENDPOINT_BACKBLAZE);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

const uploadImage = async (path, buffer, mimetype) => {
  const produto_imagem = await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return {
    path: produto_imagem.Key,
    url: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/${produto_imagem.Key}`,
  };
};

const deleteImage = async (path) => {
  await s3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: process.env.KEY_ID,
    })
    .promise();
};

module.exports = {
  uploadImage,
  deleteImage,
};
