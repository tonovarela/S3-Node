import  {getFile, listarArchivosEnBucket, listarBuckets,subirArchivo} from "./helpers/helpers.js";  


listarArchivosEnBucket("litobucket");
///subirArchivo("litobucket","./archivos/archivo.pdf","archivo.pdf");
getFile("archivo.pdf","litobucket")

