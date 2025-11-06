import User from "../models/userModel.js";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  updateUserService,
  validateUserService,
} from "../service/userService.js";

//Actuan como intermediario entre cliente y la logica de la aplicacion, reciben solicitudes, las procesa y responde
//CRUD
//Todo lo q sea req y resp es parte del controlador, el resto es service (crear instancia, buscar en la base
// guardar en la base)

export const createUser = async (req, resp) => {
  try {
    const response = await createUserService(req.body);
    resp.status(201).json(response);
  } catch (error) {
    if (error.statusCode === 409) {
      return resp.status(error.statusCode).json({ message: error.message });
    }
    return resp.status(500).json({ message: "Internal server error", error });
  }
};

export const getUsers = async (req, resp) => {
  try {
    const users = await getUsersService();
    resp.status(200).json(users);
  } catch (error) {
    if (error.statusCode === 404) {
      return resp.status(error.statusCode).json({ message: error.message });
    }
    return resp.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteUser = async (req, resp) => {
  try {
    //Obtenemos x el path param el id
    // api/user/delete/:id
    const userId = req.params.id;
    const result = await deleteUserService(userId);
    return resp.status(200).json(result);
  } catch (error) {
    if (error.statusCode === 404) {
      return resp.status(404).json({ message: error.message });
    }
    return resp.status(500).json({ message: "Internal server error", error });
  }
};

export const updateUser = async (req, resp) => {
  try {
    const userId = req.params.id;
    const updatedUser = await updateUserService(userId, req.body);
    return resp.status(201).json(updatedUser);
  } catch (error) {
    if (error.statusCode === 404) {
      return resp.status(404).json({ message: error.message });
    }
    return resp.status(500).json({ message: "Internal server error", error });
  }
};

// Autenticar/validar al usuario
export const validate = async (req, res) => {
  try {
    // Deberiamos tomar los datos que nos mandan en el req
    const { email, password } = req.body;
    const result = await validateUserService(email, password);
    console.log(result.message);
    return res.status(200).json(result);
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
