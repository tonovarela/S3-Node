import { ListBucketsCommand, S3Client, ListObjectsV2Command, PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import 'dotenv/config'
 const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});
export const subirArchivo = async (bucketName,ubicacionArchivo,nombreArchivo) => {    
    let buffer = fs.readFileSync(ubicacionArchivo);    
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: nombreArchivo,
        Body: buffer,
    });

    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};
export const crearArchivo = async () => {
    const command = new PutObjectCommand({
        Bucket: "litobucket",
        Key: "hello-s3.txt",
        Body: "Hello S4!",
    });

    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};
export const listarArchivosEnBucket = async (nombreBucket) => {
    const command = new ListObjectsV2Command({
        Bucket: nombreBucket,        
    });
    try {
        let isTruncated = true;
        console.log(`El bucket ${nombreBucket} contiene los siguientes objetos:\n`)
        let contents = "";
        while (isTruncated) {
            const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
            const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");            
            contents += contentsList + "\n";
            isTruncated = IsTruncated;
            command.input.ContinuationToken = NextContinuationToken;
        }
        console.log(contents);

    } catch (err) {
        console.error(err);
    }
};
export const listarBuckets = async () => {
    const command = new ListBucketsCommand({});
    try {
        const { Owner, Buckets } = await client.send(command);
        console.log(`${Owner.DisplayName} owns ${Buckets.length} bucket${Buckets.length === 1 ? "" : "s"}:`);
        console.log(`${Buckets.map((b) => ` • ${b.Name}`).join("\n")}`);
    } catch (err) {
        console.error(err);
    }
};
export const getFile = async (nameObject,bucketName) => {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: nameObject
    });  
    try {
      const response = await client.send(command);
      // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
      const str = await response.Body.transformToString('base64');
      fs.writeFile(`archivos/${nameObject}`, str, {encoding: 'base64'}, function(err) {        
    });                  
      
    } catch (err) {
      console.error(err);
}};
  

  // return {
//     statusCode: 200,
//     headers: {
//         "Content-Type": contentType
//     },
//     body: streamToString,
//     isBase64Encoded: true
// };

