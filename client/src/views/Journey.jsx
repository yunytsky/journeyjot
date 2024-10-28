import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteJourney, getJourney } from '../api';
import ConfirmationModal from '../components/ConfirmationModal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import MapView from '../components/MapView';

const Journey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [journey, setJourney] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(0);
  
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
    <div className="container mt-5 pb-5">
      <article>
        {/* Title */}
        <h1 className="display-4">{journey.title}</h1>

        {/* Date */}
        <p className="text-muted">
          <small>
            {new Date(journey.startDate).toLocaleDateString()} –{" "}
            {new Date(journey.endDate).toLocaleDateString()}
          </small>
        </p>

        {/* Image */}
        <img
          src={journey.image.url}
          className="img-fluid mb-4"
          alt={journey.title}
          style={{ maxHeight: "380px", width: "auto" }}
        />

        {/* Description */}
        <p className="mb-4 text-start">{journey.description}</p>

        {/* Locations */}
        {journey.locations.length > 0 && (
          <>
            <h2>Locations</h2>
            {journey.locations.map((location, index) => (
              <button
                onClick={() => {
                  setSelectedLocationId(index);
                }}
                className={
                  selectedLocationId === index
                    ? "d-block mb-1 btn p-0 fw-medium text-primary"
                    : "d-block mb-1 btn p-0"
                }
                key={index}
                style={{ border: "none" }}
              >
                {location.name} {location.coordinates.lat}{" "}
                {location.coordinates.lng}
              </button>
            ))}
          </>
        )}

        {journey.locations.length > 0 && (
          <MapContainer
            center={[
              journey.locations[selectedLocationId]?.coordinates.lat || 51.505,
              journey.locations[selectedLocationId]?.coordinates.lng || -0.09,
            ]}
            zoom={13}
            style={{
              height: "460px",
              maxWidth: "980px",
              margin: "2em 0 4em 0",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapView
              center={[
                journey.locations[selectedLocationId]?.coordinates.lat || 51.505,
                journey.locations[selectedLocationId]?.coordinates.lng || -0.09,
              ]}
            />
            {journey.locations.map((location, index) => (
              <Marker
                key={index}
                position={[location.coordinates.lat, location.coordinates.lng]}
              >
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        <hr className="w-75" />

        {/* Buttons */}
        <div>
          <Link to="edit" className="btn btn-primary me-2">
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
