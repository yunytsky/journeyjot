// src/pages/MainPage.jsx
import React, { useEffect, useState } from 'react';
import JourneyCard from '../components/JourneyCard';

const Main = () => {
  const [journeys, setJourneys] = useState([{cover_photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", title: "Title", description: "lorem ipsum dolor sit amet", journey_id: 0}]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchJourneys = async () => {
//       try {
//         setLoading(true);
//         const data = await getJourneys(page);
//         setJourneys(data.journeys);
//         setTotalPages(data.totalPages);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJourneys();
//   }, [page]);

  return (
    <div className="container mt-5">
      <h2>Your Journeys</h2>
      {loading && <p>Loading journeys...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {journeys.length === 0 && !loading && <p>No journeys found. Start your adventure!</p>}
        {journeys.map((journey) => (
          <div className="col-md-4" key={journey.journey_id}>
            <JourneyCard journey={journey} />
          </div>
        ))}
      </div>
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
  );
};

export default Main;
