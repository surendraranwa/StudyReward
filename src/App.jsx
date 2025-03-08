import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import Topics from './components/Topics';
import { TopicDetail } from './components/TopicDetail';
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:tech" element={<Topics/>} />
          <Route path="/topics/:tech/:topicName" element={<TopicDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 