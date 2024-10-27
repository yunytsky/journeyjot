import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addJourney } from '../api';

const AddJourney = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleAddJourney = async (event) => {
    event.preventDefault();

    setErrorMessage('');

    // Check for required fields
    if (!title || !startDate || !endDate) {
      setErrorMessage("Title, Start Date, and End Date are required!");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if startDate is later than endDate
    if (start > end) {
      setErrorMessage("Start Date cannot be later than End Date!");
      return;
    }

    try {
      const data = {
        title,
        description,
        startDate: start,
        endDate: end,
      };
      const res = await addJourney(data);
      console.log(res);
      navigate('/journeys'); // Redirect after successful addition
    } catch (error) {
      console.log("Error", error);
      setErrorMessage("An error occurred while adding the journey."); 
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Journey</h2>
      <form onSubmit={handleAddJourney}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title <b className='text-danger'>*</b></label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date <b className='text-danger'>*</b></label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date <b className='text-danger'>*</b></label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary">Add Journey</button>
      </form>
    </div>
  );
};

export default AddJourney;
