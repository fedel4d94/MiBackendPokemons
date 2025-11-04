import { Error } from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../../src/config/config.js";

export const createUserService = async (data) => {
  const userExists = await User.findOne({ email: data.email });
  if (userExists) {
    const error = new Error(`Usuario con email ${data.email} ya existe.`);
    error.statusCode = 409;
    throw error;
  }

  //Creamos
  const newUser = new User(data);
  //Guardamos
  await newUser.save();

  return { message: "User Created" };
};

export const getUsersService = async () => {
  //Traemos todos
  const users = await User.find();
  //Valido
  if (users.length === 0) {
    //Armo el errror.
    const error = new Error("No hay usuarios.");
    error.statusCode = 404;
    throw error;
  }

  return users;
};

export const deleteUserService = async (userId) => {
  //busco si existe
  const userExists = await User.findOne({ _id: userId });
  if (!userExists) {
    const error = new Error("User no encontrado");
    error.statusCode = 404;
    throw error;
  }
  //Elimino.
  await User.findByIdAndDelete(userId);
  return { message: "User eliminado exitosamente!" };
};

export const updateUserService = async (userId, updateData) => {
  const userExist = await User.findOne({ _id: userId });
  if (!userExist) {
    const error = new Error("User no encontrado");
    error.statusCode = 404;
    throw error;
  }

  const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true });
  return updatedUser;
};

export const validateUserService = async (email, password) => {
  if (!(email && password)) {
    const error = new Error("Falta alguno de los dos campos.");
    error.statusCode = 400;
    throw error;
  }

  const userFound = await User.findOne({ email });

  if (!userFound) {
    const error = new Error("User or Password is incorrect.");
    error.statusCode = 400;
    throw error;
  }

  if (!bcrypt.compareSync(password, userFound.password)) {
    const error = new Error("User or Password is incorrect.");
    error.statusCode = 400;
    throw error;
  }

  // Generamos el payload
  // Es la informacion que guardamos en el token
  const payload = {
    userId: userFound._id,
    userEmail: userFound.email,
  };

  // El token debe ser firmado para tener validez
  // Firma tiene: 1. payload, 2. "secret", 3. duracion
  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

  return { message: "Logged in", token };
};
