import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export const auth = () => {
    return axios.get(`${BASE_URL}/auth/success`, { withCredentials: true });
};

export const logout = () => {
  return axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true });
};

export const getJourneys = () => {
  return axios.get(`${BASE_URL}/journeys`, {withCredentials: true});
}

export const addJourney = (data) => {
  return axios.post(`${BASE_URL}/journeys`, data, {withCredentials: true});
}
