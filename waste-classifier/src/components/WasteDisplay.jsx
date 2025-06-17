import React from 'react';
import '../App.css';

export default function WasteDisplay({ category }) {
  const classes 
= ['General_Waste', 'Recycle_Paper', 'Recycle_Mixed', 'Green_Waste'];

  return (
    <div className="waste-display">
      {classes.map((type) => (
        <div
          key={type}
          className={`waste-item ${category === type ? 'highlight' : ''}`}
        >
          <img src={`/images/${type.toLowerCase()}.PNG`} alt={type} />
          <p>{type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</p>
        </div>
      ))}
    </div>
  );
}