import mongoose from "mongoose";

const MetalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purity: { type: Number, required: true }, // Added purity field
});

const Metal = mongoose.models.Metal || mongoose.model("Metal", MetalSchema);
export default Metal;
