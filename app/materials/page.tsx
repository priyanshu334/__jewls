"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Edit } from "lucide-react";

interface Material {
  _id: string;
  name: string;
  price: number;
  metal: { _id: string; name: string };
}

interface Metal {
  _id: string;
  name: string;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [metals, setMetals] = useState<Metal[]>([]);
  const [newMaterial, setNewMaterial] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newMetal, setNewMetal] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMaterial, setEditMaterial] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editMetal, setEditMetal] = useState("");

  // **Fetch materials & metals from API**
  const fetchMaterials = async () => {
    const res = await fetch("/api/materials");
    const data = await res.json();
    setMaterials(data);
  };

  const fetchMetals = async () => {
    const res = await fetch("/api/metals");
    const data = await res.json();
    setMetals(data);
  };

  useEffect(() => {
    fetchMaterials();
    fetchMetals();
  }, []);

  // **Add new material**
  const addMaterial = async () => {
    if (!newMaterial.trim() || !newPrice.trim() || !newMetal) return;
    await fetch("/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newMaterial.trim(), price: parseFloat(newPrice), metal: newMetal }),
    });
    setNewMaterial("");
    setNewPrice("");
    setNewMetal("");
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
    if (!editMaterial.trim() || !editPrice.trim() || !editMetal) return;
    await fetch("/api/materials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, name: editMaterial.trim(), price: parseFloat(editPrice), metal: editMetal }),
    });
    setEditingId(null);
    setEditMaterial("");
    setEditPrice("");
    setEditMetal("");
    fetchMaterials();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-xl p-4 sm:p-6 w-full max-w-4xl md:max-w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Materials</h2>
        <div className="flex flex-col sm:flex-row mb-6 gap-2">
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
            className="border border-gray-300 rounded-lg px-4 py-2 sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMetal}
            onChange={(e) => setNewMetal(e.target.value)}
          >
            <option value="">Select Metal</option>
            {metals.map((metal) => (
              <option key={metal._id} value={metal._id}>
                {metal.name}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition"
            onClick={addMaterial}
          >
            <Plus size={18} /> <span>Add</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-gray-600 font-medium">S. No.</th>
                <th className="p-3 text-gray-600 font-medium">Material</th>
                <th className="p-3 text-gray-600 font-medium">Price</th>
                <th className="p-3 text-gray-600 font-medium">Metal</th>
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
                  <td className="p-3 text-gray-800">
                    {editingId === material._id ? (
                      <select
                        value={editMetal}
                        onChange={(e) => setEditMetal(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1"
                      >
                        <option value="">Select Metal</option>
                        {metals.map((metal) => (
                          <option key={metal._id} value={metal._id}>
                            {metal.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      material.metal?.name || "N/A"
                    )}
                  </td>
                  <td className="p-3 text-center flex justify-center space-x-3">
                    {editingId === material._id ? (
                      <button className="text-green-500 hover:text-green-700 transition" onClick={updateMaterial}>
                        ✅
                      </button>
                    ) : (
                      <button
                        className="text-blue-500 hover:text-blue-700 transition"
                        onClick={() => {
                          setEditingId(material._id);
                          setEditMaterial(material.name);
                          setEditPrice(material.price.toString());
                          setEditMetal(material.metal?._id || "");
                        }}
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    <button className="text-red-500 hover:text-red-700 transition" onClick={() => deleteMaterial(material._id)}>
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