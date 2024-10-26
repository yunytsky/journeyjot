import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export const auth = () => {
    return axios.get(`${BASE_URL}/auth/success`, { withCredentials: true });
};

export const logout = () => {
  return axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true });
};