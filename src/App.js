import './App.css';
import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const newsRef = useRef(null);
  const handleSearch = (query) => {
    if (newsRef.current) {
      newsRef.current.handleSearch(query);
    }
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <LoadingBar
        color="#f11946"
        progress={progress}
      />
      <Routes>
        <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} ref={newsRef} key="general" pageSize={6} category="general" />} />
        <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} ref={newsRef} key="business" pageSize={6} category="business" />} />
        <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} ref={newsRef} key="entertainment" pageSize={6} category="entertainment" />} />
        <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} ref={newsRef} key="health" pageSize={6} category="health" />} />
        <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} ref={newsRef} key="science" pageSize={6} category="science" />} />
        <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} ref={newsRef} key="sports" pageSize={6} category="sports" />} />
        <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} ref={newsRef} key="technology" pageSize={6} category="technology" />} />
      </Routes>
    </Router>
  );
};

export default App;