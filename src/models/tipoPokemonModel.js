import { model, Schema } from "mongoose";

const tipoPokemonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      minlength: 4,
      maxlength: 20,
    },
    description: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      lowercase: true,
      minlength: 4,
      maxlength: 100,
    },
  },
  {
    //createdAt y updatedAt
    timestamps: true,
  }
);

export default model("tipoPokemon", tipoPokemonSchema);
