import mongoose, { Schema, model, models } from "mongoose";

const MaterialSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Added price field
});

const Material = models.Material || model("Material", MaterialSchema);

export default Material;
