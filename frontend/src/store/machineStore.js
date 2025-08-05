// src/store/machineStore.js
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSoundStore } from './soundStore';

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = process.env.REACT_API_URL || 'https://laundryping.onrender.com'

export const useMachineStore = create((set, get) => {
  let alarmPlayed = {};
  const { playAlarm } = useSoundStore.getState();

 
  const updateTimers = () => {
    const { machines } = get();
    const now = Date.now();
    const newTimers = {};

    machines.forEach((machine) => {
      if (machine.in_use && machine.start_time && machine.duration) {
        const end = new Date(machine.start_time).getTime() + machine.duration * 1000;
        const secondsLeft = Math.max(0, Math.floor((end - now) / 1000));
        newTimers[machine.id] = secondsLeft;

        if (secondsLeft === 0 && !alarmPlayed[machine.id]) {
          get().toggleInUse(machine.id);
          toast.success("Machine finished!");
          alarmPlayed[machine.id] = true;
          playAlarm();
        }

        if (secondsLeft > 0) {
          alarmPlayed[machine.id] = false;
        }
      }
    });

    set({ timers: newTimers });
  };

  return {
    machines: [],
    timers: {},
    intervalStarted: false,
    pollingStarted: false,

    fetchMachines: async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/machines/`);
        set({ machines: res.data });
      } catch (err) {
        console.error('Fetch machines failed: ', err);
      }
    },

    addMachine: async (name) => {
      const res = await axios.post(`${BASE_URL}/api/machines/`, { name });
      const updated = [...get().machines, res.data];
      set({ machines: updated });
      updateTimers();
    },

    deleteMachine: async (id) => {
      await axios.delete(`${BASE_URL}/api/machines/${id}/`);
      const updated = get().machines.filter((m) => m.id !== id);
      set({ machines: updated });
      updateTimers();
    },

    toggleInUse: async (id) => {
      const res = await axios.post(`${BASE_URL}/api/machines/${id}/toggle_in_use/`);
      const updated = get().machines.map((m) => (m.id === id ? res.data : m));
      set({ machines: updated });
      updateTimers();
    },

    startTimer: async (id, duration) => {
      const res = await axios.post(`${BASE_URL}/api/machines/${id}/start_timer/`, { duration });
      const updated = get().machines.map((m) => (m.id === id ? res.data : m));
      set({ machines: updated });
      alarmPlayed[id] = false;
      updateTimers();
    },

    startTimerInterval: () => {
      if (!get().intervalStarted) {
        set({ intervalStarted: true });
        updateTimers()
        setInterval(get().updateTimers, 1000);
      }
    },

    startMachinePolling: () => {
      if (!get().pollingStarted) {
        set({ pollingStarted: true });
        setInterval(get().fetchMachines, 10000); // poll every 60s
      }
    },

    updateTimers,
  };
});
