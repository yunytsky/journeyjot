// src/components/JourneyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JourneyCard = ({ journey }) => {
  return (
    <div className="card mb-4" style={{ width: "100%"}}>
      <img
        src={journey.cover_photo}
        className="card-img-top img-fluid"
        alt={journey.title}
        style={{ objectFit: "cover", height: "150px", padding: "0" }} 
      />
      <div className="card-body p-3">
        <h5 className="card-title">{journey.title}</h5>
        <p className="card-text">{journey.description.length > 100 ? journey.description.substring(0, 100) + "..." : journey.description}</p>
        <Link to={`/journey/${journey.journey_id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
};



export default JourneyCard;
