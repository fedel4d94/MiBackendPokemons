import express from "express";
import { createPokemon, deletePokemon, getPokemons, updatePokemon } from "../controllers/pokemonController.js";
import { verifyTokenMiddlaware } from "../middlewares/verifyTokenMiddleware.js";

export const pokemonRouter = express.Router();

pokemonRouter.post("/create", verifyTokenMiddlaware, createPokemon);
pokemonRouter.get("/", getPokemons);
pokemonRouter.delete("/delete/:id", verifyTokenMiddlaware, deletePokemon);
pokemonRouter.put("/update/:id", verifyTokenMiddlaware, updatePokemon);
