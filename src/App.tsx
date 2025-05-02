import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { GameProvider } from './context/GameContext';
import { GameScreen } from './components/GameScreen';
import { AdminPanel } from './components/admin/AdminPanel';

function App() {
  return (
    <Router>
      <GameProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<GameScreen />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Layout>
      </GameProvider>
    </Router>
  );
}

export default App;