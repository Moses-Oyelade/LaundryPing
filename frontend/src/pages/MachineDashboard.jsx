import React, { useEffect, useState } from "react";
import {
  fetchMachines,
  createMachine,
  updateMachine,
  deleteMachine,
} from "../api";
import MachineCard from "../components/MachineCard";

const MachineDashboard = () => {
  const [machines, setMachines] = useState([]);
  const [name, setName] = useState("");

  const loadMachines = async () => {
    const res = await fetchMachines();
    setMachines(res.data);
    console.log("response Data: ", res.data)
  };

  useEffect(() => {
    loadMachines();
    const interval = setInterval(loadMachines, 10000); // poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createMachine({ name, status: "available" });
    setName("");
    loadMachines();
  };

  const handleToggle = async (machine) => {
    const newStatus = machine.status === "available" ? "in_use" : "available";
    await updateMachine(machine.id, {
      status: newStatus,
      last_used: new Date().toISOString(),
    });
    loadMachines();
  };

  const handleDelete = async (id) => {
    await deleteMachine(id);
    loadMachines();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl text-cyan-300 font-bold mb-4 text-center">LaundryPing - Machines</h1>

      <form onSubmit={handleAdd} className="flex gap-2 mb-6 justify-center">
        <input
          className="border p-2 rounded w-60"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Machine name"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Machine
        </button>
      </form>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {machines.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MachineDashboard;
