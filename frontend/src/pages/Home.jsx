import React, { useEffect, useState } from "react";
import { fetchMachines } from "../api";
import MachineCard from "../components/MachineCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const [machinesInUse, setMachinesInUse] = useState([]);
  const navigate = useNavigate();

  const loadInUseMachines = async () => {
    const res = await fetchMachines();
    const inUse = res.data.filter((machine) => machine.status === "in_use");
    setMachinesInUse(inUse);
  };

  useEffect(() => {
    loadInUseMachines();
    const interval = setInterval(loadInUseMachines, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Machines Currently In Use
      </h1>

      {/* Scrollable card section */}
      <div className="w-full max-w-5xl overflow-y-auto max-h-[600px] px-2">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {machinesInUse.map((machine) => (
            <MachineCard
              key={machine.id}
              machine={machine}
              onToggle={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
        {machinesInUse.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            No machines currently in use.
          </p>
        )}
      </div>

      {/* Button to navigate to full dashboard */}
      <div className="mt-8">
        <button
          onClick={() => navigate("/machines")}
          className="bg-cyan-500 text-white px-6 py-3 rounded hover:bg-cyan-600"
        >
          Go to Machine Dashboard
        </button>
      </div>

      <footer className="mt-10">
        <span className="text-lime-700 text-sm bg-slate-300 rounded p-1">
          @Muzak 2025
        </span>
      </footer>
    </div>
  );
}

export default Home;
