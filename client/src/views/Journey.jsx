import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteJourney, getJourney } from '../api';
import ConfirmationModal from '../components/ConfirmationModal';

const Journey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [journey, setJourney] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await getJourney(id);
        setJourney(res.data.journey);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchJourney();
  }, [id]);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteJourney(id);
      setShowModal(false);
      navigate("/journeys");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false); 
  };

  if (!journey) {
    return <p>Loading journey...</p>;
  }

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
          <small>{new Date(journey.startDate).toLocaleDateString()} – {new Date(journey.endDate).toLocaleDateString()}</small>
        </p>
        <p className="lead">{journey.description}</p>
        <div>
          <Link
            to="edit"
            className="btn btn-primary me-2"
          >
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </article>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Journey;
