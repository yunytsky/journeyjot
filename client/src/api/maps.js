// https://nominatim.openstreetmap.org/search?q={query}
import axios from "axios";
export const getMapSuggestions = async (query) => {
    const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    return res.data.map((item) => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      }));
}