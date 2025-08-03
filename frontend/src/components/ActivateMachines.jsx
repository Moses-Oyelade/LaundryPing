import { useEffect, useState } from 'react';
import { useMachineStore } from '../store/machineStore';
import { useSoundStore } from '../store/soundStore';

const formatTime = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function ActivateMachine() {
  const {
    machines,
    timers,
    fetchMachines,
    startTimerInterval,
    toggleInUse,
    updateTimers,
  } = useMachineStore();

  const { enableAudio,
        // playAlarm,
        // isAudioEnabled,
    } = useSoundStore();

  const [loading, setLoading] = useState(true)

  // Fetch fresh machine data when this page mounts
  useEffect(() => {
    fetchMachines();

  }, [fetchMachines,]);

  useEffect(() => {
  enableAudio(); // optional, or use a button
  // playAlarm()
}, [enableAudio]);


  useEffect(() => {
    updateTimers();   
    startTimerInterval();   
    setLoading(false);
  }, [updateTimers, startTimerInterval]);

  const handleStop = async (machineId) => {
    await toggleInUse(machineId); // This should flip `in_use` and update backend
    updateTimers();               // Clean up local timer display
  };
  // const handleToggleAudio = () => {
  //   if (isAudioEnabled) {
  //     disableAudio();
  //   } else {
  //     enableAudio();
  //   }
  // };

  if (loading) return <div className="p-4 text-center">Loading machines...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Machines In Use</h2>
        {/* <button
          onClick={handleToggleAudio}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isAudioEnabled ? '🔇 Mute Alarm' : '🔊 Unmute Alarm'}
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="mt-2 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              >
                Stop
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
