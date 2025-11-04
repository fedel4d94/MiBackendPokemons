import TipoPokemon from "../models/tipoPokemonModel.js";
import mongoose from "mongoose";

export const createTipoPokemonService = async (data) => {
  const tipoExists = await TipoPokemon.findOne({ name: data.name });
  if (tipoExists) {
    const error = new Error("Tipo de Pokemon ya existe!");
    error.statusCode = 409;
    throw error;
  }
  const newTipoPokemon = new TipoPokemon(data);
  await newTipoPokemon.save();

  return { message: `Tipo de Pokemon <${data.name}> Creado!` };
};

export const getTipoPokemonService = async () => {
  const tipos = await TipoPokemon.find();

  if (tipos.length === 0) {
    const error = new Error("No hay tipos de pokemons creados.");
    error.statusCode = 404;
    throw error;
  }
  return tipos;
};

export const deleteTipoPokemonService = async (id) => {
  //Valido si es un ID valido de mongodb
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`El ID '${id}' no es válido.`);
    error.statusCode = 400;
    throw error;
  }
  const tipoPokemon = await TipoPokemon.findByIdAndDelete(id);
  if (!tipoPokemon) {
    const error = new Error(`No se encontró el Tipo de Pokemon con id: ${id} `);
    error.statusCode = 404;
    throw error;
  }
  return tipoPokemon;
};

export const updatedTipoPokemonService = async (id, updateData) => {
  //Valido si es un ID valido de mongodb
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`El ID '${id}' no es válido.`);
    error.statusCode = 400;
    throw error;
  }

  const tipoPokemonExist = await TipoPokemon.findOne({ _id: id });
  if (!tipoPokemonExist) {
    const error = new Error(`No se encontró el Tipo de Pokemon con id: ${id}`);
    error.statusCode = 404;
    throw error;
  }
  const tipoPokemon = await TipoPokemon.findByIdAndUpdate({ _id: id }, updateData, { new: true, runValidators: true });
  return tipoPokemon;
};
