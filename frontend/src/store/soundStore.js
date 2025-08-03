// src/store/soundStore.js
import { create } from 'zustand';

export const useSoundStore = create((set) => {
  const alarm = new Audio('/simple_alarm.mp3');
  alarm.volume = 1.0;

  return {
    isAudioEnabled: false,

    enableAudio: async () => {
      try {
        await alarm.play(); // unlock
        alarm.pause();
        alarm.currentTime = 0;
        set({ isAudioEnabled: true });
      } catch (err) {
        console.warn("User gesture needed to enable audio:", err);
      }
    },

    disableAudio: () => set({ isAudioEnabled: false }),

    toggleAudio: () =>
    set((state) => ({ audioEnabled: !state.audioEnabled })),

    playAlarm: () => {
      const { isAudioEnabled } = useSoundStore.getState();
      if (isAudioEnabled) {
        alarm.play().catch(err => console.warn("Alarm play failed:", err));
      }
    },
  };
});
