import { useEffect, useState } from 'react';
import { useMachineStore } from '../store/machineStore';
import { useSoundStore } from '../store/soundStore';

const formatTime = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

// ... imports unchanged
export default function ActivateMachine() {
  const {
    machines,
    timers,
    fetchMachines,
    startTimerInterval,
    toggleInUse,
    updateTimers,
  } = useMachineStore();

  const { enableAudio } = useSoundStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMachines();
  }, [fetchMachines]);

  useEffect(() => {
    enableAudio();
  }, [enableAudio]);

  useEffect(() => {
    updateTimers();
    startTimerInterval();
    setLoading(false);
  }, [updateTimers, startTimerInterval]);

  const handleStop = async (machineId) => {
    await toggleInUse(machineId);
    updateTimers();
  };

  if (loading) return <div className="p-4 text-center">Loading machines...</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Machines In Use</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {machines
          .filter((m) => m.in_use)
          .map((machine) => (
            <div key={machine.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{machine.name}</h3>
              <p className="text-sm text-gray-600">Status: {machine.status}</p>

              {timers[machine.id] !== undefined ? (
                <div className="font-mono text-green-600 text-2xl my-2">
                  ⏱ {formatTime(timers[machine.id])}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No timer set</p>
              )}

              <button
                onClick={() => handleStop(machine.id)}
                className="mt-2 px-3 py-1 w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              >
                Stop
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

