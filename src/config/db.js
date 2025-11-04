//Mongoose es nuestro ODM
import mongoose, { mongo } from "mongoose";
import { MONGODB_URI, UTN_DB } from "./config.js";

//Crear la conexion a la BD

export const connectDB = async () => {
  try {
    //Nos conectamos a la URI de mongoDB
    //Localhost es 127.0.0.1
    //La estructura suele ser mongodb://localhost:PORT/database_name
    await mongoose.connect(MONGODB_URI + UTN_DB);
    console.log("Database connected");
  } catch (error) {
    console.log("Error al conectar la base de datos " + error);
    process.exit(1);
  }
};
