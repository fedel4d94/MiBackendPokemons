import {
  createTipoPokemonService,
  deleteTipoPokemonService,
  getTipoPokemonService,
  updatedTipoPokemonService,
} from "../service/tipoPokemonService.js";
import { handleError } from "../utils/handleError.js";

export const createTipoPokemon = async (req, res) => {
  try {
    const response = await createTipoPokemonService(req.body);
    return res.status(201).json(response);
  } catch (error) {
    handleError(res, error);
  }
};

export const getTipoPokemon = async (req, res) => {
  try {
    const response = await getTipoPokemonService();
    return res.status(200).json(response);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteTipoPokemon = async (req, res) => {
  try {
    const tipoID = req.params.id;
    const deletedTypo = await deleteTipoPokemonService(tipoID);
    return res
      .status(200)
      .json({ message: `Se Eliminó el tipo: ${deletedTypo.name} exitosamente!`, Pokemon: deletedTypo });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateTipoPokemon = async (req, res) => {
  try {
    const tipoID = req.params.id;
    const updatedTypo = await updatedTipoPokemonService(tipoID, req.body);
    return res
      .status(200)
      .json({ message: `Se Actualizó el tipo: ${updatedTypo.name} exitosamente!`, Pokemon: updatedTypo });
  } catch (error) {
    handleError(res, error);
  }
};
