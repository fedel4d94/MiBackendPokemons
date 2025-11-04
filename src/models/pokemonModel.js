import mongoose, { model, Schema } from "mongoose";

export const rarityEnum = ["Comun", "Poco comun", "Raro", "Legendario", "Mitico"];
const primeraMayus = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const pokemonSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Campo name es necesario."],
      unique: true,
      trim: true,
      set: primeraMayus,
      minlength: [4, "requiere minimo de 4 caracteres."],
      maxlength: [20, "requiere maximo de 20 caracteres."],
    },
    description: {
      type: String,
      require: false,
      unique: false,
      trim: true,
      lowercase: true,
      minlength: [4, "minimo de 4 caracteres."],
      maxlength: [200, "maximo de 200 caracteres."],
    },
    tipo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tipoPokemon",
      require: [true, "Campo tipo es necesario."],
      trim: true,
      unique: false,
    },
    habilidades: {
      type: String,
      required: [true, "Campo habilidades es necesario."],
      unique: false,
      trim: true,
      lowercase: true,
      minlength: [4, "minimo de 4 caracteres."],
      maxlength: [50, "maximo de 50 caracteres."],
    },
    nivel: {
      type: Number,
      required: [true, "Campo nivel es necesario."],
      unique: false,
      min: [1, "El nivel no puede ser menor a 1."],
      max: [1000, "El nivel no puede ser mayor a 1000"],
    },
    peso: {
      type: Number,
      required: [true, "Campo peso es necesario."],
      unique: false,
      min: [1, "El peso no puede ser menor a 1."],
      max: [5000, "El peso no puede ser mayor a 5000"],
    },
    rarity: {
      type: String,
      required: [true, "Campo rareza es necesario."],
      set: primeraMayus,
      validate: {
        validator: function (rarity) {
          return rarityEnum.includes(rarity);
        },
        message: (props) => `<${props.value}> no es una rareza valida. Debe ser una de las siguientes: ${rarityEnum.join(",")}`,
      },
    },
  },
  {
    //createdAt y updatedAt
    timestamps: true,
  }
);

export default model("pokemon", pokemonSchema);
