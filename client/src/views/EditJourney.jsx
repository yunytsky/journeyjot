import { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { getJourney, editJourney } from '../api';

const EditJourney = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [originalJourney, setOriginalJourney] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null); // New image to be uploaded
  const [originalImage, setOriginalImage] = useState(''); // Existing image preview
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await getJourney(id);
        const journey = res.data.journey;

        setOriginalJourney(journey);
        setTitle(journey.title);
        setDescription(journey.description || '');
        setStartDate(journey.startDate?.split('T')[0]);
        setEndDate(journey.endDate?.split('T')[0]);
        setOriginalImage(journey.image.url); // Set the existing image
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchJourney();
  }, [id]);

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

  const handleEditJourney = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!title || !startDate || !endDate) {
      setErrorMessage("Title, start date, and end date are required.");
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
    if (image) updatedData.image = image; // Include image if it was updated

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
          <label htmlFor="title" className="form-label">Title <b className='text-danger'>*</b></label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          />
        </div>
        
        {/* Image Upload and Preview */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Update Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImage}
          />
          {image ? (
            <img src={image} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />
          ) : (
            originalImage && (
              <img src={originalImage} alt="Current" style={{ width: '200px', marginTop: '10px' }} />
            )
          )}
        </div>

        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
        <div>
          <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(`/journeys/${id}`, {replace: true})}>Cancel</button>
          <button type="submit" className="btn btn-primary">Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default EditJourney;


