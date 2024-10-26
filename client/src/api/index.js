import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export const auth = (data, config) => {
    return axios.get(`${BASE_URL}/auth/success`, { withCredentials: true });
  };