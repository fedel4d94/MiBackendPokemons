import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./src/config/db.js";
import { PORT, SECRET } from "./src/config/config.js";
import { userRouter } from "./src/routes/userRoute.js";
import session from "express-session";
import { tipoPokemonRouter } from "./src/routes/tipoPokemonRoute.js";
import { pokemonRouter } from "./src/routes/pokemonRoute.js";

//instancia del servidor de express
const app = express();
//Conexion a BD
connectDB();

//Con app.use aplicamos metodos de dependencias en nuestro servidor.

//Midlewares -> software del medio - entre dos sistemas.
app.use(bodyParser.json()); //(sino llega en json no lo lee, es una seguridad tmb)

//Parsear el cuerpo de la solicitud para que pueda ser leida.
app.use(bodyParser.urlencoded({ extended: true }));

//Midleware Generamos el uso de la sesion
app.use(
  session({
    secret: SECRET, //dato unbico de nuestro sistema
    resave: false, // Evita que la sesion se vuelva a guardar si no hay datos,.
    saveUninitialized: false, //Evita que se guarde una sesion no inicializada.
  })
);

//Rutas Base - las agrupamos por recurso.
//Lo que las distingue son el metodo q usamos, post, get, etc en el userRoute
app.use("/api/user", userRouter);
app.use("/api/tipoPokemon", tipoPokemonRouter);
app.use("/api/pokemon", pokemonRouter);

//Crear la escucha del servidor, para hacerlo correr.
app.listen(PORT, () => {
  console.log("Server running at " + PORT);
});
