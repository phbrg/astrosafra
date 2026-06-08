import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClimateIntelligence from './pages/ClimateIntelligence';
import CropManagement from './pages/CropManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clima" element={<ClimateIntelligence />} />
        <Route path="/safra" element={<CropManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;