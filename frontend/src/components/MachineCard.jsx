import React from "react";
import { format, isToday } from 'date-fns';


const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const minutes = Math.floor(seconds / 60);
  return minutes > 0 ? `${minutes} min ago` : "Just now";
};

const formatLastUsed = (timestamp) => {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return `Today at ${format(date, 'h:mm a')}`; // e.g. "Today at 4:30 PM"
  } else {
    return format(date, 'PPpp'); // e.g. "Jul 26, 2025 at 4:30 PM"
  }
};


const MachineCard = ({ machine, onToggle, onDelete }) => {

    console.log("machine info: ", machine)
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full sm:w-64">
      <h2 className="text-lg font-bold mb-2">{machine.name}</h2>
      <p className="text-sm mb-1">
        Status: <span className={machine.status === "in_use" ? "text-red-600" : "text-green-600"}>{machine.status}</span>
      </p>
      {machine.in_use_since && (
        <p className="text-xs text-gray-500 mb-2">Last used: {timeSince(machine.in_use_since)}</p>
      )}
      <p className="pb-2">
        {machine.status === 'in_use' ? (
          <>In use for: <span className="text-red-500 font-bold size-3">{machine.usage_duration_minutes} mins</span></>
        ) : (
          <>Last used: <span className="text-sm bg-slate-300 ">{formatLastUsed(machine.last_used)}</span></>
        )}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onToggle(machine)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm"
        >
          Toggle Status
        </button>
        <button
          onClick={() => onDelete(machine.id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MachineCard;
