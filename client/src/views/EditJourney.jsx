import { useCallback, useEffect, useMemo, useRef, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { getJourney, editJourney } from '../api';
import { getMapSuggestions } from '../api/maps';

const EditJourney = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [originalJourney, setOriginalJourney] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null); // New image to be uploaded
  const [imagePreview, setImagePreview] = useState(''); // Existing image preview
  const [errorMessage, setErrorMessage] = useState('');
  const [locations, setLocations] = useState([{ name: '', coordinates: {lat: null, lng: null}, suggestions: [], showSuggestions: false }]);

  const suggestionsRefs = useRef([]);
  
  const debounce = (func, timeout) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  };

  //Fetching journey info
  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await getJourney(id);
        const journey = res.data.journey;

        setOriginalJourney(journey);
        setTitle(journey.title);
        setDescription(journey.description);
        setStartDate(journey.startDate?.split('T')[0]);
        setEndDate(journey.endDate?.split('T')[0]);
        setImagePreview(journey.image.url);
        setLocations(journey.locations);  
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchJourney();
  }, [id]);

  //Images
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
  
  //Locations
  const handleAddLocation = () => {
    if (locations.length < 150) {
      setLocations([...locations, { name: '', coordinates: {lat: null, lng: null}, suggestions: [], showSuggestions: false }]);
    }
  };

  const handleRemoveLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
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
    updatedLocations[index].coordinates.lat = null;
    updatedLocations[index].coordinates.lng = null;
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


  //Submit edit
  const handleEditJourney = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    //Data verification
    if (!title || !startDate || !endDate) {
      setErrorMessage("Title, start date, and end date are required.");
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

    
    const hasDuplicateLocations = (arr) => {
      const seen = new Set();
      
      for (const location of arr) {
        const identifier = `${location.name}-${location.coordinates.lat}-${location.coordinates.lng}`;
        if (seen.has(identifier)) {
          return true;
        }
        seen.add(identifier);
      }
      
      return false;
    };

    if (hasDuplicateLocations(locations)) {
      setErrorMessage("There cannot be duplicate locations");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      setErrorMessage("Start Date cannot be later than End Date!");
      return;
    }

    const updatedData = {};
    if (title !== originalJourney.title) updatedData.title = title;
    if (description !== originalJourney.description) updatedData.description = description;
    if (startDate !== originalJourney.startDate?.split('T')[0]) updatedData.startDate = start;
    if (endDate !== originalJourney.endDate?.split('T')[0]) updatedData.endDate = end;
    if (image) updatedData.image = image;
    


    function areLocationsEqual(locationsA, locationsB) {
      if (locationsA.length !== locationsB.length) return false;
      
      return locationsA.every(locA => 
          locationsB.some(locB => 
              locA.name === locB.name && locA.coordinates.lat === locB.coordinates.lat && locA.coordinates.lng === locB.coordinates.lng
          )
      );
    }

    if(!(areLocationsEqual(locations, originalJourney.locations))){
      if(locations.length > 1 || (locations.length === 1 && locations[0].name)){
        const formattedLocations = locations.map(loc => ({
          name: loc.name,
          coordinates: loc.coordinates
        }));
        updatedData.locations = formattedLocations;
      }
    }

    console.log(updatedData)

    if (Object.keys(updatedData).length === 0) {
      navigate(`/journeys/${id}`, {replace:true});
      return;
    }

    try {
      await editJourney(id, updatedData);
      navigate(`/journeys/${id}`, {replace: true});
    } catch (error) {
      console.log("Error", error);
      setErrorMessage("An error occurred while editing the journey.");
    }
  };

  return (
    <div className="container mt-5 pb-4">
      <h2>Edit Journey</h2>
      <form onSubmit={handleEditJourney}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title <b className="text-danger">*</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date <b className="text-danger">*</b>
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date <b className="text-danger">*</b>
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Locations */}
        <div className="mb-3">
          <h5>Locations</h5>
          {locations.map((loc, index) => (
            <div key={index} className="mb-2 position-relative">
              <input
                type="text"
                className={`form-control mb-1 ${
                  errorMessage &&
                  (loc.coordinates.lat === null || loc.coordinates.lng === null)
                    ? "border-danger"
                    : ""
                }`} // Add danger outline
                value={loc.name}
                placeholder="Enter a location"
                onChange={(e) => handleLocationChange(index, e.target.value)}
              />
              {loc.showSuggestions &&
                loc.suggestions.length > 0 &&
                loc.name && (
                  <ul
                    ref={(el) => (suggestionsRefs.current[index] = el)}
                    className="list-group position-absolute"
                    style={{ zIndex: 1000 }}
                  >
                    {loc.suggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="list-group-item list-group-item-action"
                        onClick={() =>
                          handleSuggestionSelect(index, suggestion)
                        }
                        style={{ cursor: "pointer" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f8f9fa")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "white")
                        }
                      >
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
              {locations.length > 1 && (
                <button
                  type="button"
                  className="btn p-0 text-danger"
                  onClick={() => handleRemoveLocation(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn p-0 text-primary fw-medium"
            onClick={handleAddLocation}
          >
            Add Location +
          </button>
        </div>

        {/* Image Upload and Preview */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Update Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImage}
          />
          {image ? (
            <img
              src={image}
              alt="Preview"
              style={{ width: "200px", marginTop: "10px" }}
            />
          ) : (
            imagePreview && (
              <img
                src={imagePreview}
                alt="Current"
                style={{ width: "200px", marginTop: "10px" }}
              />
            )
          )}
        </div>

        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
        <div>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate(`/journeys/${id}`, { replace: true })}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJourney;


