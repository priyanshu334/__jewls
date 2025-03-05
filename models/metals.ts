import mongoose from "mongoose";

const MetalSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Metal = mongoose.models.Metal || mongoose.model("Metal", MetalSchema);
export default Metal;
