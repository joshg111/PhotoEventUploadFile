import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
// import { S3 } from 'aws-sdk/clients/s3';
import * as S3 from 'aws-sdk/clients/s3';
import uniqid from 'uniqid';
import mime from 'mime';

// Example code - https://blog.webiny.com/upload-files-to-aws-s3-using-pre-signed-post-data-and-a-lambda-function-7a9fb06d56c1
// A good serverless example - https://serverless.com/blog/s3-one-time-signed-url/

const maxFileSize = process.env.MAX_FILE_SIZE || 10000000;
const bucketName = process.env.BUCKET_NAME || 'photoevent-photos';

/**
 * Use AWS SDK to create pre-signed POST data.
 * We also put a file size limit (100B - 10MB).
 * @param key
 * @param contentType
 * @returns {Promise<object>}
 */
const createPresignedPost = ({ key, contentType }) => {
  const s3 = new S3();
  const params = {
    Expires: 60,
    Bucket: bucketName,
    Conditions: [["content-length-range", 100, maxFileSize]], // 100Byte - 10MB
    Fields: {
      "Content-Type": contentType,
      key
    }
  };

  return new Promise(async (resolve, reject) => {
    s3.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

/**
 * We need to respond with adequate CORS headers.
 * @type {{"Access-Control-Allow-Origin": string, "Access-Control-Allow-Credentials": boolean}}
 */
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};





export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const date = new Date();
  const presignedPostData = await createPresignedPost({
    key: `${date.getTime() / 1000}_${uniqid()}`,
    contentType: 'image/png'
  });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      error: false,
      data: presignedPostData,
      message: null
    })
  };



  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
  //     input: event,
  //   }, null, 2),
  // };


}
