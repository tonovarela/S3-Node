import  {getFile, listarArchivosEnBucket, listarBuckets,subirArchivo} from "./helpers/helpers.js";  
console.log("Antes");
await listarArchivosEnBucket("litobucket");
console.log("Despues ...");
await getFile("archivo.pdf","litobucket")



