import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MachineDashboard from "./pages/MachineDashboard";
import Home from "./pages/Home"; // Optional home page
import NotFound from "./pages/NotFound"; // Optional 404

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/machines" element={<MachineDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
