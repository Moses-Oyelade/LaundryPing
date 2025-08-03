import { useSoundStore } from '../store/soundStore';

export default function StartTimerButton ({ machineId, startTimer }) {
  const enableAudio = useSoundStore(state => state.enableAudio);

  const handleClick = async () => {
    await enableAudio(); // unlock audio
    startTimer(machineId); // your own timer logic
  };

  return (
    <button onClick={handleClick} className="bg-green-500 text-white px-4 py-2 rounded">
      Start Timer
    </button>
  );
};
