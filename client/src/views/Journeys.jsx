// src/pages/MainPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import JourneyCard from '../components/JourneyCard';
import bgImage from "../assets/hero-bg.jpg";
import { UserContext } from '../context/UserContext';

const Journeys = () => {
  const {user} = useContext(UserContext);

  const [journeys, setJourneys] = useState([
    {
      cover_photo:
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      title: "Title",
      description: "lorem ipsum dolor sit amet",
      journey_id: 0,
    },
    {
      cover_photo:
      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      title: "Title",
      description: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
      journey_id: 1,
    },
    {
      cover_photo:
      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      title: "Title",
      description: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
      journey_id: 1,
    },
    {
      cover_photo:
      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      title: "Title",
      description: "Donec id elit non mi porta gravida at eget metus. Fusce ommodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
      journey_id: 1,
    },
    {
      cover_photo:
      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      title: "Title",
      description: "Donec id elit non odio dui.",
      journey_id: 1,
    },
    {
      cover_photo:
      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      title: "Title",
      description: "Donec id elit nousce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
      journey_id: 1,
    },
    {
      cover_photo:
      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      title: "Title",
      description: "Donec id elit ndo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
      journey_id: 1,
    },
  ]);
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
  <div>
    {/* Hero Section */}
    <div className="jumbotron jumbotron-fluid" style={{ backgroundImage: `linear-gradient(to bottom, rgba(5, 2, 20, 0.5) 0%, rgba(19, 15, 48, 0.5) 100%), url("${bgImage}")`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', height: '480px', backgroundPosition: "50%  25%" }}>
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
      <h2>Your Journeys</h2>
      {loading && <p>Loading journeys...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {journeys.length === 0 && !loading && <p>No journeys found. Start your adventure!</p>}
        {journeys.map((journey) => (
          <div className="col-md-4 mb-4" key={journey.journey_id}>
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
