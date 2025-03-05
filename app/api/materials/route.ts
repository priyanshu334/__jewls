import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Material from "@/models/material"; 

// **GET** - Fetch all materials
export async function GET() {
  await connectToDatabase();
  const materials = await Material.find({});
  return NextResponse.json(materials);
}

// **POST** - Add new material
export async function POST(req: Request) {
  const { name, price } = await req.json();
  await connectToDatabase();
  const newMaterial = await Material.create({ name, price });
  return NextResponse.json(newMaterial, { status: 201 });
}

// **DELETE** - Delete a material
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await connectToDatabase();
  await Material.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted successfully" });
}

// **PUT** - Update a material (name & price)
export async function PUT(req: Request) {
  const { id, name, price } = await req.json();
  await connectToDatabase();
  await Material.findByIdAndUpdate(id, { name, price });
  return NextResponse.json({ message: "Updated successfully" });
}
