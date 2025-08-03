// src/pages/Home.jsx
// src/pages/Home.jsx
import React from 'react';
import { useEffect } from 'react';
// import { useMachineStore } from '../store/machineStore';
import { useSoundStore } from '../store/soundStore';
import ActivateMachines from '../components/ActivateMachines';
import AudioToggleButton from '../components/AudioToggleButton';

const Home = () => {
  const { enableAudio } = useSoundStore()
  
  useEffect(() => {
    enableAudio(); // optional, or use a button
  }, [enableAudio]);


  return (
    <div className="w-full min-h-screen max-w-5xl mx-auto px-2 py-4">
      <main className="bg-gray-100 rounded p-4 shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Active Machines</h1>
        <ActivateMachines />
      </main>
      <div className="mt-4 text-center">
        <AudioToggleButton />
        <a href='/machines'>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Acitvate / Add Machine
          </button>
        </a>
      </div>
    </div>
  );
};

export default Home;


