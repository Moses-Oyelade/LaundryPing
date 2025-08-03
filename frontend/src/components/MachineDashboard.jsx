// import { useState } from 'react';
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
  const [durations, setDurations] = useState({});

  useEffect(() => {
    startTimerInterval();
    startMachinePolling();
  }, [startTimerInterval, startMachinePolling]); 



  const handleAdd = () => {
    if (newName.trim()) addMachine(newName).then(() => setNewName(''));
  };

  const handleStartTimer = (id) => {
    const duration = parseInt(durations[id]);
    if (duration > 0) startTimer(id, duration);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">LaundryPing Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New machine name"
          className="border p-2 rounded w-full"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {machines.map(machine => (
          <div key={machine.id} className="border rounded p-4 flex justify-between items-center bg-white shadow">
            <div>
              <h2 className="font-semibold text-lg">{machine.name}</h2>
              <p>Status: <span className={`font-bold ${machine.status === 'in_use' ? 'text-red-500' : 'text-green-600'}`}>
                {machine.status}
              </span></p>
              {timers[machine.id] > 0 && (
                <p>⏱ {timers[machine.id]}s left</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Timer (s)"
                  value={durations[machine.id] || ''}
                  onChange={(e) => setDurations({ ...durations, [machine.id]: e.target.value })}
                  className="border px-2 py-1 rounded w-24"
                />
                < StartTimerButton machineId={machine.id} startTimer={handleStartTimer} />
                <button
                  onClick={() => toggleInUse(machine.id)}
                  className={timers[machine.id] > 0 ? (
                    "bg-red-600 text-white px-2 py-1 rounded"
                  ) : (
                    "bg-purple-500 text-white px-2 py-1 rounded"
                  )}
                >
                  {timers[machine.id] > 0 ? (
                    "Stop"
                  ) : (
                    "Toggle In Use"
                  )}
                </button>
              </div>
            </div>
            <button
              onClick={() => deleteMachine(machine.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
