import React from 'react';
import { useNavigate } from 'react-router-dom';
import { checkout } from '../api';

const GetPremium = () => {
  const navigate = useNavigate();

  const handleGetPremium = async () => {
    try {
      const res = await checkout();
      if(res.data.url){
        window.location.href = res.data.url;
      }else{
        throw new Error;
      }
    } catch (error) {
      console.error("Error purchasing premium:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <div className="card-body text-center">
          <h1 className="card-title display-5 mb-3">Unlock Premium Access</h1>
          <p className="lead mb-4">
            Premium users enjoy access to journey statistics, including journey counts by year!
          </p>
          <p className="text-muted">
            By upgrading to premium, you’ll be able to access statistics and make the most of your journey tracking experience.
          </p>
          <div className="my-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleGetPremium}
            >
              Get Premium for $9.99
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetPremium;
