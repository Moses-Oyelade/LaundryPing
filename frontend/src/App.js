import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MachineDashboard from "./components/MachineDashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useMachineStore } from "./store/machineStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const fetchMachines = useMachineStore((state) => state.fetchMachines);
  const startTimerInterval = useMachineStore((state) => state.startTimerInterval);
  const startMachinePolling = useMachineStore((state) => state.startMachinePolling);

  useEffect(() => {
    fetchMachines();
    startTimerInterval();
    startMachinePolling();

  }, [fetchMachines, startTimerInterval, startMachinePolling]);
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/machines" element={<MachineDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
};

export default App;
