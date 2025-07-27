import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MapPage from './components/MapPage';
import SavedRoute from './components/SavedRoute';
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
            <Route path="/saved-routes" element={<SavedRoute />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
