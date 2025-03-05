"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Edit } from "lucide-react";

interface Material {
  _id: string;
  name: string;
  price: number;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMaterial, setEditMaterial] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // **Fetch materials from API**
  const fetchMaterials = async () => {
    const res = await fetch("/api/materials");
    const data = await res.json();
    setMaterials(data);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // **Add new material**
  const addMaterial = async () => {
    if (!newMaterial.trim() || !newPrice.trim()) return;
    await fetch("/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newMaterial.trim(), price: parseFloat(newPrice) }),
    });
    setNewMaterial("");
    setNewPrice("");
    fetchMaterials();
  };

  // **Delete a material**
  const deleteMaterial = async (id: string) => {
    await fetch("/api/materials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchMaterials();
  };

  // **Update a material**
  const updateMaterial = async () => {
    if (!editMaterial.trim() || !editPrice.trim()) return;
    await fetch("/api/materials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, name: editMaterial.trim(), price: parseFloat(editPrice) }),
    });
    setEditingId(null);
    setEditMaterial("");
    setEditPrice("");
    fetchMaterials();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Materials</h2>
        <div className="flex mb-6 space-x-2">
          <input
            type="text"
            placeholder="Enter Material Name..."
            className="border border-gray-300 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMaterial}
            onChange={(e) => setNewMaterial(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Price..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
            onClick={addMaterial}
          >
            <Plus size={18} /> <span>Add</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-gray-600 font-medium">S. No.</th>
                <th className="p-3 text-gray-600 font-medium">Material</th>
                <th className="p-3 text-gray-600 font-medium">Price</th>
                <th className="p-3 text-gray-600 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <tr key={material._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 text-gray-800">{index + 1}</td>
                  <td className="p-3 text-gray-800">
                    {editingId === material._id ? (
                      <input
                        type="text"
                        value={editMaterial}
                        onChange={(e) => setEditMaterial(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1"
                      />
                    ) : (
                      material.name
                    )}
                  </td>
                  <td className="p-3 text-gray-800">
                    {editingId === material._id ? (
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1"
                      />
                    ) : (
                      `₹ ${material.price}`
                    )}
                  </td>
                  <td className="p-3 text-center flex justify-center space-x-3">
                    {editingId === material._id ? (
                      <button
                        className="text-green-500 hover:text-green-700 transition"
                        onClick={updateMaterial}
                      >
                        ✅
                      </button>
                    ) : (
                      <button
                        className="text-blue-500 hover:text-blue-700 transition"
                        onClick={() => {
                          setEditingId(material._id);
                          setEditMaterial(material.name);
                          setEditPrice(material.price.toString());
                        }}
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => deleteMaterial(material._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
