import axios from "axios";

export const BASE_URL = "https://journeyjot-u1cg.onrender.com";

export const auth = () => {
    return axios.get(`${BASE_URL}/auth/success`, { withCredentials: true });
};

export const logout = () => {
  return axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true });
};

export const getJourneys = () => {
  return axios.get(`${BASE_URL}/journeys`, {withCredentials: true});
}

export const getJourney = (journeyId) => {
  return axios.get(`${BASE_URL}/journeys/${journeyId}`, {withCredentials: true});
}

export const editJourney = (journeyId, data) => {
  return axios.patch(`${BASE_URL}/journeys/${journeyId}`, data, {withCredentials: true});
}

export const addJourney = (data) => {
  return axios.post(`${BASE_URL}/journeys`, data, {withCredentials: true});
}

export const deleteJourney = (journeyId) => {
  return axios.delete(`${BASE_URL}/journeys/${journeyId}`, {withCredentials: true});
}

export const getLocations = () => {
  return axios.get(`${BASE_URL}/locations`, {withCredentials: true});
}

export const checkout = (data) => {
  return axios.post(`${BASE_URL}/subscription/checkout`, data, {withCredentials: true});
}

