import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Material from "@/models/material";
import Metal from "@/models/metals"; 

// **GET** - Fetch all materials (with metal details)
export async function GET() {
  await connectToDatabase();
  const materials = await Material.find({}).populate("metal"); // Populate metal details
  return NextResponse.json(materials);
}

// **POST** - Add new material (requires metal reference)
export async function POST(req: Request) {
  await connectToDatabase();
  const { name, price, metal } = await req.json();

  // Check if the referenced metal exists
  const existingMetal = await Metal.findById(metal);
  if (!existingMetal) {
    return NextResponse.json({ error: "Invalid metal reference" }, { status: 400 });
  }

  const newMaterial = await Material.create({ name, price, metal });
  return NextResponse.json(newMaterial, { status: 201 });
}

// **DELETE** - Delete a material
export async function DELETE(req: Request) {
  await connectToDatabase();
  const { id } = await req.json();

  const deletedMaterial = await Material.findByIdAndDelete(id);
  if (!deletedMaterial) {
    return NextResponse.json({ error: "Material not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}

// **PUT** - Update a material (name, price & metal)
export async function PUT(req: Request) {
  await connectToDatabase();
  const { id, name, price, metal } = await req.json();

  // Check if material exists
  const material = await Material.findById(id);
  if (!material) {
    return NextResponse.json({ error: "Material not found" }, { status: 404 });
  }

  // Validate metal reference if updating
  if (metal) {
    const existingMetal = await Metal.findById(metal);
    if (!existingMetal) {
      return NextResponse.json({ error: "Invalid metal reference" }, { status: 400 });
    }
  }

  const updatedMaterial = await Material.findByIdAndUpdate(
    id,
    { name, price, metal },
    { new: true }
  );

  return NextResponse.json(updatedMaterial);
}
