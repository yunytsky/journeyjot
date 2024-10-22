// src/components/JourneyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JourneyCard = ({ journey }) => {
  return (
    <div className="card mb-4">
      <img src={journey.cover_photo} className="card-img-top" alt={journey.title} />
      <div className="card-body">
        <h5 className="card-title">{journey.title}</h5>
        <p className="card-text">{journey.description}</p>
        <div className="d-flex justify-content-between">
          <Link to={`/journey/${journey.journey_id}`} className="btn btn-primary">View Details</Link>
          <Link to={`/edit/${journey.journey_id}`} className="btn btn-warning">Edit</Link>
          <button className="btn btn-danger" onClick={() => handleDelete(journey.journey_id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default JourneyCard;
