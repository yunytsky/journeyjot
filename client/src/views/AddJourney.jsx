import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addJourney } from '../api';
import { getMapSuggestions } from '../api/maps';

const AddJourney = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [locations, setLocations] = useState([{ name: '', coordinates: {lat: null, lng: null}, suggestions: [], showSuggestions: false }]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const suggestionsRefs = useRef([]);
  useEffect(() => {console.log("locations", locations)}, [locations])
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const handleAddLocation = () => {
    if (locations.length < 150) {
      setLocations([...locations, { name: '', coordinates: {lat: null, lng: null}, suggestions: [], showSuggestions: false }]);
    }
  };

  const handleRemoveLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };

  const debounce = (func, timeout) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  };

  const getSuggestions = useCallback(async (index, value) => {
    const fetchedSuggestions = await getMapSuggestions(value);
    setLocations((prevLocations) => {
      const updatedLocations = [...prevLocations];
      updatedLocations[index].suggestions = fetchedSuggestions;
      updatedLocations[index].showSuggestions = fetchedSuggestions.length > 0;
      return updatedLocations;
    });
  }, []);

  const debouncedGetSuggestions = useMemo(() => {
    return debounce((index, value) => getSuggestions(index, value), 500);
  }, [getSuggestions]);

  const handleLocationChange = async (index, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index].name = value;
    updatedLocations[index].coordinates.lat = null; // Reset lat on input change
    updatedLocations[index].coordinates.lng = null; // Reset lng on input change
    setLocations(updatedLocations);

    if (value) {
      debouncedGetSuggestions(index, value);
    } else {
      setLocations((prevLocations) => {
        const updatedLocations = [...prevLocations];
        updatedLocations[index].suggestions = [];
        updatedLocations[index].showSuggestions = false;
        return updatedLocations;
      });
    }
  };

  const handleSuggestionSelect = (index, suggestion) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = {
      name: suggestion.name,
      coordinates: {
        lat: suggestion.lat,
        lng: suggestion.lng,
      },
      suggestions: [],
      showSuggestions: false
    };
    setLocations(updatedLocations);
  };

  const handleClickOutside = (event) => {
    suggestionsRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target)) {
        setLocations((prevLocations) => {
          const updatedLocations = [...prevLocations];
          updatedLocations[index].suggestions = [];
          updatedLocations[index].showSuggestions = false;
          return updatedLocations;
        });
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddJourney = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!title || !startDate || !endDate) {
      setErrorMessage("Title, Start Date, End Date, and valid Locations are required!");
      return;
    }

    if (locations.length === 1 && locations[0].name) {
      if (locations[0].coordinates.lng === null || locations[0].coordinates.lat === null) {
        setErrorMessage("Choose a valid location");
        return;
      }
    }

    if (locations.length > 1 && locations.some(loc => !loc.name || loc.coordinates.lat === null || loc.coordinates.lng === null)) {
      setErrorMessage("Choose a valid location or remove it");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      setErrorMessage("Start Date cannot be later than End Date!");
      return;
    }

    try {
      let formattedLocations

      //Formatting locations if they were included
      if(locations.length > 1 || (locations.length === 1 && locations[0].name)){
        formattedLocations = locations.map(loc => ({
          name: loc.name,
          coordinates: loc.coordinates
        }));
      }

      const data = {
        title,
        description,
        startDate: start,
        endDate: end,
        image,
        locations: formattedLocations
      };

      await addJourney(data);
      navigate('/journeys', { replace: true });
    } catch (error) {
      console.log("Error", error);
      setErrorMessage("An error occurred while adding the journey.");
    }
  };

  return (
    <div className="container mt-5 pb-4">
      <h2>Add New Journey</h2>
      <form onSubmit={handleAddJourney}>

        {/* Title */}
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
        
        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        {/* Start Date */}
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

        {/* End Date */}
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

        {/* Locations */}
        <div className="mb-3">
          <h5>Locations</h5>
          {locations.map((loc, index) => (
            <div key={index} className="mb-2 position-relative">
              <input
                type="text"
                className={`form-control mb-1 ${errorMessage && (loc.coordinates.lat === null || loc.coordinates.lng === null) ? 'border-danger' : ''}`} // Add danger outline
                value={loc.name}
                placeholder="Enter a location"
                onChange={(e) => handleLocationChange(index, e.target.value)}
              />
              {loc.showSuggestions && loc.suggestions.length > 0 && loc.name && (
                <ul ref={(el) => suggestionsRefs.current[index] = el} className="list-group position-absolute" style={{ zIndex: 1000 }}>
                  {loc.suggestions.map((suggestion, idx) => (
                    <li 
                      key={idx} 
                      className="list-group-item list-group-item-action" 
                      onClick={() => handleSuggestionSelect(index, suggestion)}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
              {locations.length > 1 && (
                <button type="button" className="btn p-0 text-danger" onClick={() => handleRemoveLocation(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" className="btn p-0 text-primary fw-medium" onClick={handleAddLocation}>
            Add Location +
          </button>
        </div>

        {/* Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImage}
          />
        </div>

        {/* Error Message */}
        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Add Journey</button>
      </form>
    </div>
  );
};

export default AddJourney;
