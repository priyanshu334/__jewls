import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Metal from "@/models/metals"; 

// 📌 GET: Fetch all metals
export async function GET() {
  try {
    await connectToDatabase();
    const metals = await Metal.find();
    return NextResponse.json(metals);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch metals" }, { status: 500 });
  }
}

// 📌 POST: Add a new metal
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, purity } = await req.json();

    if (!name || purity === undefined) {
      return NextResponse.json({ error: "Metal name and purity are required" }, { status: 400 });
    }

    const newMetal = await Metal.create({ name, purity });
    return NextResponse.json(newMetal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add metal" }, { status: 500 });
  }
}

// 📌 PATCH: Update a metal (name or purity)
export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const { id, name, purity } = await req.json();

    if (!id || (name === undefined && purity === undefined)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const updatedMetal = await Metal.findByIdAndUpdate(
      id,
      { ...(name && { name }), ...(purity !== undefined && { purity }) },
      { new: true }
    );

    if (!updatedMetal) {
      return NextResponse.json({ error: "Metal not found" }, { status: 404 });
    }

    return NextResponse.json(updatedMetal);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update metal" }, { status: 500 });
  }
}

// 📌 DELETE: Remove a metal
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await Metal.findByIdAndDelete(id);
    return NextResponse.json({ message: "Metal deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete metal" }, { status: 500 });
  }
}
