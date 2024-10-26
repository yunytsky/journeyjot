import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
        navigate("/journeys")
    }
  }, [user])

  return (
    <div className="container" style={{margin: "5rem 0 0 0", maxWidth: "100vw"}}>
      <div className="hero bg-light py-5 text-center">
        <h1 className="display-4">JourneyJot</h1>
        <p className="lead">
          Capture and cherish your travel memories in one place. Explore your adventures and share the journey.
        </p>
        <a href="/journeys" className="btn btn-primary btn-lg mt-3">Get Started</a>
      </div>
    </div>
  );
}

export default Main;
