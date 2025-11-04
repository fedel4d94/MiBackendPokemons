import mongoose, { mongo } from "mongoose";
import { isGoodPassword } from "../utils/validators.js";
import bcrypt from "bcrypt";

//Creamos el schema de usuario.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 40,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 40,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 40,
      trim: true,
      lowercase: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 16,
      max: 110,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return isGoodPassword(value);
        },
      },
      message: "La password debe contener entre 6 y 12 caracteres, 1 mayuscula, 1 minuscula y al menos 1 numero.",
    },
  },
  {
    //cuando se cree y se modifique van a existir campos de createdAt y updatedAt
    timestamps: true,
  }
);

//Encriptamos antes de guardar la password
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

//Exportamos el modelo
// "user" es la coleccion, la tabla con la que elijo trabajar.
export default mongoose.model("user", userSchema);
