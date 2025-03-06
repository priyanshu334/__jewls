"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Edit } from "lucide-react";

interface Metal {
  _id: string;
  name: string;
  purity: number;
}

export default function MetalsPage() {
  const [metals, setMetals] = useState<Metal[]>([]);
  const [newMetal, setNewMetal] = useState("");
  const [newPurity, setNewPurity] = useState<number | "">(""); // Handle empty state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMetal, setEditMetal] = useState("");
  const [editPurity, setEditPurity] = useState<number | "">("");

  // **Fetch metals from API**
  const fetchMetals = async () => {
    const res = await fetch("/api/metals");
    const data = await res.json();
    setMetals(data);
  };

  useEffect(() => {
    fetchMetals();
  }, []);

  // **Add new metal**
  const addMetal = async () => {
    if (!newMetal.trim() || newPurity === "") return;
    await fetch("/api/metals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newMetal.trim(), purity: Number(newPurity) }),
    });
    setNewMetal("");
    setNewPurity("");
    fetchMetals();
  };

  // **Delete a metal**
  const deleteMetal = async (id: string) => {
    await fetch("/api/metals", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchMetals();
  };

  // **Update a metal**
  const updateMetal = async () => {
    if (!editMetal.trim() || editPurity === "") return;
    await fetch("/api/metals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, name: editMetal.trim(), purity: Number(editPurity) }),
    });
    setEditingId(null);
    setEditMetal("");
    setEditPurity("");
    fetchMetals();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-xl p-4 sm:p-6 w-full max-w-4xl md:max-w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Metals</h2>

        {/* Input Fields */}
        <div className="flex flex-col sm:flex-row mb-6 gap-2">
          <input
            type="text"
            placeholder="Enter Metal Name..."
            className="border border-gray-300 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMetal}
            onChange={(e) => setNewMetal(e.target.value)}
          />
          <input
            type="number"
            placeholder="Purity"
            className="border border-gray-300 rounded-lg px-4 py-2 sm:w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPurity}
            onChange={(e) => setNewPurity(e.target.value ? Number(e.target.value) : "")}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition"
            onClick={addMetal}
          >
            <Plus size={18} /> <span>Add</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-gray-600 font-medium">S. No.</th>
                <th className="p-3 text-gray-600 font-medium">Metal</th>
                <th className="p-3 text-gray-600 font-medium">Purity</th>
                <th className="p-3 text-gray-600 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {metals.map((metal, index) => (
                <tr key={metal._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 text-gray-800">{index + 1}</td>

                  {/* Name Field */}
                  <td className="p-3 text-gray-800">
                    {editingId === metal._id ? (
                      <input
                        type="text"
                        value={editMetal}
                        onChange={(e) => setEditMetal(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1"
                      />
                    ) : (
                      metal.name
                    )}
                  </td>

                  {/* Purity Field */}
                  <td className="p-3 text-gray-800">
                    {editingId === metal._id ? (
                      <input
                        type="number"
                        value={editPurity}
                        onChange={(e) => setEditPurity(e.target.value ? Number(e.target.value) : "")}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-20"
                      />
                    ) : (
                      metal.purity
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-center flex justify-center space-x-3">
                    {editingId === metal._id ? (
                      <button
                        className="text-green-500 hover:text-green-700 transition"
                        onClick={updateMetal}
                      >
                        ✅
                      </button>
                    ) : (
                      <button
                        className="text-blue-500 hover:text-blue-700 transition"
                        onClick={() => {
                          setEditingId(metal._id);
                          setEditMetal(metal.name);
                          setEditPurity(metal.purity);
                        }}
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => deleteMetal(metal._id)}
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