"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Edit } from "lucide-react";

interface Metal {
  _id: string;
  name: string;
}

export default function MetalsPage() {
  const [metals, setMetals] = useState<Metal[]>([]);
  const [newMetal, setNewMetal] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMetal, setEditMetal] = useState("");

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
    if (!newMetal.trim()) return;
    await fetch("/api/metals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newMetal.trim() }),
    });
    setNewMetal("");
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
    if (!editMetal.trim()) return;
    await fetch("/api/metals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, name: editMetal.trim() }),
    });
    setEditingId(null);
    setEditMetal("");
    fetchMetals();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-2xl md:max-w-full ">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Metals</h2>
        <div className="flex mb-6 space-x-2">
          <input
            type="text"
            placeholder="Enter Metal Name..."
            className="border border-gray-300 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMetal}
            onChange={(e) => setNewMetal(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
            onClick={addMetal}
          >
            <Plus size={18} /> <span>Add</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-gray-600 font-medium">S. No.</th>
                <th className="p-3 text-gray-600 font-medium">Metal</th>
                <th className="p-3 text-gray-600 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {metals.map((metal, index) => (
                <tr key={metal._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 text-gray-800">{index + 1}</td>
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
