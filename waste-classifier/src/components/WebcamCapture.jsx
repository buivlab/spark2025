import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as tmImage from '@teachablemachine/image';

const MODEL_URL = '/model/';

export default function WebcamCapture({ onClassify, isContinuous }) {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tmImage.load(MODEL_URL + 'model.json', MODEL_URL + 'metadata.json');
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const classify = useCallback(async () => {
    if (webcamRef.current && model) {
      const prediction = await model.predict(webcamRef.current.video);
      const topResult = prediction.reduce((a, b) => (a.probability > b.probability ? a : b));
      const confidenceThreshold = 0.8;
      const category = topResult.probability >= confidenceThreshold ? topResult.className : 'General_Waste';
      onClassify(category);
      speak(category);
    }
  }, [model, onClassify]);

  useEffect(() => {
    let interval;
    if (isContinuous && model && webcamRef.current) {
      interval = setInterval(() => classify(), 1500);
    }
    return () => clearInterval(interval);
  }, [isContinuous, model, classify]);

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(`This is ${text} waste`);
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="webcam-wrapper">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width={300} />
      {!isContinuous && (
        <button onClick={classify} className="classify-button">Classify</button>
      )}
    </div>
  );
}
