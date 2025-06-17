// App.jsx
import React, { useState } from 'react';
import WebcamCapture from './components/WebcamCapture';
import WasteDisplay from './components/WasteDisplay';
import './App.css';

function App() {
  const [category, setCategory] = useState('');
  const [isContinuous, setIsContinuous] = useState(false);

  return (
    <div className="app-container">
      <h1 className="title">🗑️ Waste Classifier</h1>
      <p className="subtitle">Show your waste to the camera and see where it goes!</p>
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="continuous"
          checked={isContinuous}
          onChange={() => setIsContinuous(!isContinuous)}
        />
        <label htmlFor="continuous">Continuous Classification</label>
      </div>
      <WebcamCapture onClassify={setCategory} isContinuous={isContinuous} />
      <WasteDisplay category={category} />
    </div>
  );
}

export default App;