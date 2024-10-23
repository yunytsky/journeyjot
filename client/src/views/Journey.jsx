import React, { useState } from 'react';


const Journey = ({ onEdit, onDelete }) => {
    const [journey, setJourney] = useState({
        cover_photo:
          "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        title: "Title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit porttitor condimentum. Donec lorem lectus, volutpat fringilla faucibus sit amet, dignissim eu mi. Nulla aliquam diam nec magna rutrum, in facilisis diam congue. Integer tincidunt ornare blandit. Vestibulum ornare nisl nec imperdiet rutrum. Vestibulum tempor libero eu mauris faucibus tristique. Vestibulum feugiat, magna vel placerat rhoncus, lectus lacus volutpat elit, tristique lobortis nisl ligula id dolor. Donec velit orci, volutpat et quam vitae, molestie dignissim justo. Integer lacinia vehicula purus nec malesuada.",
        journey_id: 0,
      });
  if (!journey) {
    return <p>Loading journey...</p>;
  }

  return (
    <div className="container mt-5">
      <article className="text-center">
        <img
          src={journey.cover_photo}
          className="img-fluid mb-4"
          alt={journey.title}
          style={{ maxHeight: '400px', width: 'auto' }} // Adjust the maxHeight as needed
        />
        <h1 className="display-4">{journey.title}</h1>
        <p className="text-muted">
          <small>{new Date(journey.date).toLocaleDateString()}</small>
        </p>
        <p className="lead">{journey.description}</p>
        <div>
          <button className="btn btn-primary me-2" onClick={() => onEdit(journey.journey_id)}>
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
