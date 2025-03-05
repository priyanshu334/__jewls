import mongoose, { Schema, model, models } from "mongoose";

const MaterialSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  metal: { type: Schema.Types.ObjectId, ref: "Metal", required: true }, // Reference to Metal
});

const Material = models.Material || model("Material", MaterialSchema);

export default Material;
