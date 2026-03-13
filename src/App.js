import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {

  const apiKey = "0c1cde9c9ce24fab89a09f0f303b25c0";
  const [progress, setProgress] = useState(0);

  return (
    <Router>

      <Navbar />

      <LoadingBar
        color="#f11946"
        progress={progress}
      />

      <Routes>

        <Route
          path="/"
          element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} category="general" />}
        />

        <Route
          path="/business"
          element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={6} category="business" />}
        />

        <Route
          path="/entertainment"
          element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={6} category="entertainment" />}
        />

        <Route
          path="/health"
          element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={6} category="health" />}
        />

        <Route
          path="/science"
          element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={6} category="science" />}
        />

        <Route
          path="/sports"
          element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={6} category="sports" />}
        />

        <Route
          path="/technology"
          element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={6} category="technology" />}
        />

      </Routes>

    </Router>
  );
};

export default App;