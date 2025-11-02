import { useEffect, useState } from 'react';
import { useMachineStore } from '../store/machineStore';
import StartTimerButton from './StartTimerButton';

export default function MachineDashboard() {
  const {
    machines,
    addMachine,
    deleteMachine,
    toggleInUse,
    startTimer,
    timers,
    startTimerInterval,
    startMachinePolling,
  } = useMachineStore();

  const [newName, setNewName] = useState('');
  const [durations, setDurations] = useState({}); // { id: { mins: '', secs: '' } }

  useEffect(() => {
    startTimerInterval();
    startMachinePolling();
  }, [startTimerInterval, startMachinePolling]);

  const handleAdd = () => {
    if (newName.trim()) {
      addMachine(newName).then(() => setNewName(''));
    }
  };

  const handleStartTimer = (id) => {
    const min = parseInt(durations[id]?.mins || '0', 10);
    const sec = parseInt(durations[id]?.secs || '0', 10);
    const total = min * 60 + sec;
    if (total > 0) {
      startTimer(id, total);
    }
  };

  const handleDurationChange = (id, field, value) => {
    setDurations({
      ...durations,
      [id]: {
        ...durations[id],
        [field]: value,
      },
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">🧺 LaundryPing Dashboard</h1>

      {/* Add machine input */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new machine name"
          className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition w-full sm:w-auto"
        >
          ➕ Add Machine
        </button>
      </div>

      {/* Machine Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className="border rounded-lg p-4 bg-white shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{machine.name}</h2>
              <p className="text-sm font-medium mb-2">
                Status:{" "}
                <span
                  className={`font-bold ${
                    machine.status === 'in_use' ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {machine.status}
                </span>
              </p>

              {timers[machine.id] > 0 && (
                <p className="mb-2 text-gray-700 font-mono">
                  ⏱ {Math.floor(timers[machine.id] / 60)}m {timers[machine.id] % 60}s left
                </p>
              )}

              {/* Timer Inputs */}
              <div className="flex flex-col sm:flex-row items-center gap-2 mb-3">
                <input
                  type="number"
                  min="0"
                  value={durations[machine.id]?.mins || ''}
                  onChange={(e) => handleDurationChange(machine.id, 'mins', e.target.value)}
                  placeholder="Min"
                  className="border px-3 py-1 rounded-md w-full sm:w-20"
                />
                <input
                  type="number"
                  min="0"
                  value={durations[machine.id]?.secs || ''}
                  onChange={(e) => handleDurationChange(machine.id, 'secs', e.target.value)}
                  placeholder="Sec"
                  className="border px-3 py-1 rounded-md w-full sm:w-20"
                />
                <StartTimerButton
                  machineId={machine.id}
                  startTimer={handleStartTimer}
                />
                <button
                  onClick={() => toggleInUse(machine.id)}
                  className={`text-white px-3 py-1 rounded-md w-full sm:w-auto ${
                    timers[machine.id] > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-500 hover:bg-purple-600'
                  } transition`}
                >
                  {timers[machine.id] > 0 ? 'Stop' : 'Toggle In Use'}
                </button>
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteMachine(machine.id)}
              className="mt-2 text-sm text-red-500 hover:bg-red-600 hover:text-red-100 rounded-md px-3 py-1 self-end transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition w-12 sm:w-auto"
        >
          Done
        </button>
    </div>
  );
}
