import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJourney } from '../api';


const Journey = ({ onEdit, onDelete }) => {
    const {id} = useParams();
    const [journey, setJourney] = useState({});


  if (!journey) {
    return <p>Loading journey...</p>;
  }

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await getJourney(id);
        setJourney(res.data.journey);
      } catch (error) {
        console.log("Error", error)
      }
    }

    fetchJourney();
  }, [])

  return (
    <div className="container mt-5 pb-4">
      <article className="text-center">
        <img
          src={journey.photoUrl}
          className="img-fluid mb-4"
          alt={journey.title}
          style={{ maxHeight: '380px', width: 'auto' }}
        />
        <h1 className="display-4">{journey.title}</h1>
        <p className="text-muted">
          <small>{new Date(journey.date).toLocaleDateString()}</small>
        </p>
        <p className="lead">{journey.description}</p>
        <div>
          <button className="btn btn-primary me-2 " onClick={() => onEdit(journey.journey_id)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(journey.journey_id)}>
            Delete
          </button>
        </div>
      </article>
    </div>
  );
};

export default Journey;
