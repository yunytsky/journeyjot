// src/pages/MainPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import JourneyCard from '../components/JourneyCard';
import bgImage from "../assets/hero-bg.jpg";
import { UserContext } from '../context/UserContext';
import { addJourney, getJourneys } from '../api';

const Journeys = () => {
  const {user} = useContext(UserContext);

  const [journeys, setJourneys] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        setLoading(true);
        const res = await getJourneys();
        console.log("RES", res.data.journeys)
        setJourneys(res.data.journeys);
        // setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJourneys();
  }, [page]);

const handleAddJourney = async () => {
  try {
    const data = {title: "random title", description: "random description", date: new Date(), photoUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"}
    const res = await addJourney(data);
    console.log(res)

  } catch (error) {
    console.log("Error", error)
  }
}

return (
  <div>
    {/* Hero Section */}
    <div className="jumbotron jumbotron-fluid" style={{ backgroundImage: `linear-gradient(to bottom, rgba(5, 2, 20, 0.5) 0%, rgba(19, 15, 48, 0.5) 100%), url("${bgImage}")`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', height: '480px', backgroundPosition: "50% 25%" }}>
      <div className="container text-center text-white h-100 d-flex flex-column justify-content-center">
        <h1 className="display-4">Hello, {user.username}!</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <input
          type="text"
          placeholder="Search for journeys..."
          className="form-control mt-3"
          style={{ maxWidth: '400px', margin: '0 auto', height: "44px" }}
        />
      </div>
    </div>

    {/* Cards Section */}
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Journeys</h2>
        <button className="btn btn-primary" onClick={handleAddJourney}>
          Add Journey +
        </button>
      </div>
      {loading && <p>Loading journeys...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {journeys.length === 0 && !loading && <p>No journeys found. Start your adventure!</p>}
        {journeys.map((journey) => (
          <div className="col-md-4 mb-4" key={journey._id}>
            <JourneyCard journey={journey} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-4">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>&laquo; Previous</button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li className={`page-item ${page === index + 1 ? 'active' : ''}`} key={index}>
                <button className="page-link" onClick={() => setPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(page + 1)}>Next &raquo;</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  </div>
);



};

export default Journeys;
