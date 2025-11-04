import express from "express";
import {
  createTipoPokemon,
  deleteTipoPokemon,
  getTipoPokemon,
  updateTipoPokemon,
} from "../controllers/tipoPokemonController.js";
import { verifyTokenMiddlaware } from "../middlewares/verifyTokenMiddleware.js";

export const tipoPokemonRouter = express.Router();

tipoPokemonRouter.post("/create", verifyTokenMiddlaware, createTipoPokemon);
tipoPokemonRouter.get("/", getTipoPokemon);
tipoPokemonRouter.delete("/delete/:id", verifyTokenMiddlaware, deleteTipoPokemon);
tipoPokemonRouter.put("/update/:id", verifyTokenMiddlaware, updateTipoPokemon);
