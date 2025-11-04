import { config } from "dotenv";

//El config es una forma de centralizar configuraciones sobre los .env y exportar lo q necesito
// sino deberia usar process.env en todos lados. Es practico nomas.

config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const UTN_DB = process.env.UTN_DB;
export const SECRET = process.env.SECRET;
