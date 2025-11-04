import Pokemon from "../models/pokemonModel.js";
import TipoPokemon from "../models/tipoPokemonModel.js";
import mongoose from "mongoose";

export const createPokemonService = async (data) => {
  const pokemonExist = await Pokemon.findOne({ name: data.name });
  if (pokemonExist) {
    const error = new Error(`Pokemon ${data.name} ya existe.`);
    error.statusCode = 409;
    throw error;
  }
  const tipo = await TipoPokemon.findOne({ name: data.tipo });
  if (!tipo) {
    const error = new Error(`El tipo '${data.tipo}' no existe.`);
    error.statusCode = 400;
    throw error;
  }
  const newPokemon = new Pokemon({
    ...data,
    tipo: tipo._id,
  });
  await newPokemon.save();
  await newPokemon.populate("tipo", "name description");
  return newPokemon;
};

export const getPokemonsService = async () => {
  const pokemons = await Pokemon.find().populate("tipo", "name -_id");
  if (pokemons.length === 0) {
    const error = new Error(`No hay Pokemons creados.`);
    error.statusCode = 404;
    throw error;
  }
  return pokemons;
};

export const deletePokemonService = async (id) => {
  //Valido si es un ID valido de mongodb
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`El ID '${id}' no es válido.`);
    error.statusCode = 400;
    throw error;
  }
  const pokemonEliminado = await Pokemon.findOne({ _id: id });
  if (!pokemonEliminado) {
    const error = new Error(`No se encontró el Pokemon a eliminar con id: ${id}`);
    error.statusCode = 404;
    throw error;
  }
  await Pokemon.findByIdAndDelete({ _id: id });
  return pokemonEliminado;
};

export const updatePokemonService = async (id, data) => {
  //Valido si es un ID valido de mongodb
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`El ID '${id}' no es válido.`);
    error.statusCode = 400;
    throw error;
  }
  const pokemonExist = await Pokemon.findOne({ _id: id });
  if (!pokemonExist) {
    const error = new Error(`No se encontró el Pokemon a Updatear con id: ${id}`);
    error.statusCode = 404;
    throw error;
  }
  const pokemonUpdated = await Pokemon.findByIdAndUpdate({ _id: id }, data, { new: true, runValidators: true });
  return pokemonUpdated;
};
