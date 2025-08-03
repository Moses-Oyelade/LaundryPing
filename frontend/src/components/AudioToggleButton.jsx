import { useSoundStore } from '../store/soundStore';

const AudioToggleButton = () => {
  const audioEnabled = useSoundStore((state) => state.audioEnabled);
  const toggleAudio = useSoundStore((state) => state.toggleAudio);

    
  return (
    <button
      onClick={toggleAudio}
      className={`px-4 py-2 rounded text-white font-medium transition ${
        audioEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {audioEnabled ? '🔇 Mute Alarm Sound' : '🔊 Enable Alarm Sound'}
    </button>
  );
};

export default AudioToggleButton;
