import {
  createPokemonService,
  deletePokemonService,
  getPokemonsService,
  updatePokemonService,
} from "../service/pokemonService.js";
import { handleError } from "../utils/handleError.js";

export const createPokemon = async (req, res) => {
  try {
    const pokemon = await createPokemonService(req.body);
    return res.status(201).json({ message: `Pokemon ${response.name} creado! `, pokemon: pokemon });
  } catch (error) {
    handleError(res, error);
  }
};

export const getPokemons = async (req, res) => {
  try {
    const response = await getPokemonsService();
    return res.status(200).json(response);
  } catch (error) {
    handleError(res, error);
  }
};

export const deletePokemon = async (req, res) => {
  try {
    const idPokemon = req.params.id;
    const pokemonEliminado = await deletePokemonService(idPokemon);
    return res
      .status(200)
      .json({ message: `Se eliminó el Pokemon ${pokemonEliminado.name} Exitosamente!`, pokemon: pokemonEliminado });
  } catch (error) {
    handleError(res, error);
  }
};

export const updatePokemon = async (req, res) => {
  try {
    const idPokemon = req.params.id;
    const pokemonUpdated = await updatePokemonService(idPokemon, req.body);
    return res
      .status(200)
      .json({ message: `Se Actualizó el Pokemon ${pokemonUpdated.name} Exitosamente!`, pokemon: pokemonUpdated });
  } catch (error) {
    handleError(res, error);
  }
};
