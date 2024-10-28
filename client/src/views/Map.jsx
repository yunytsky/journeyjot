import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import { getLocations } from '../api';
import MapView from '../components/MapView';
  
const Map = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedLocationId, setSelectedLocationId] = useState(0);


    useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const res = await getLocations();
        setLocations(res.data.locations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

    return (
      <div className="container mt-5 pb-5">
        {loading && <p>Loading journeys...</p>}
        {error && <p className="text-danger">{error}</p>}

        {locations.length === 0 && !loading && <p>No locations added yet.</p>}

        {locations.length > 0 && (
          <>
            <h2>Locations visited</h2>
            {locations.map((location, index) => (
              <button
                onClick={() => {
                  setSelectedLocationId(index);
                }}
                className={
                  selectedLocationId === index
                    ? "d-block mb-1 btn p-0 fw-medium text-primary"
                    : "d-block mb-1 btn p-0"
                }
                key={index}
                style={{ border: "none" }}
              >
                {location.name} {location.coordinates.lat}{" "}
                {location.coordinates.lng}
              </button>
            ))}
          </>
        )}

        {locations.length > 0 && (
          <MapContainer
            center={[
              locations[selectedLocationId]?.coordinates.lat || 51.505,
              locations[selectedLocationId]?.coordinates.lng || -0.09,
            ]}
            zoom={13}
            style={{
              height: "460px",
              maxWidth: "980px",
              margin: "2em 0 4em 0",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapView
              center={[
                locations[selectedLocationId]?.coordinates.lat || 51.505,
                locations[selectedLocationId]?.coordinates.lng || -0.09,
              ]}
            />
            {locations.map((location, index) => (
              <Marker
                key={index}
                position={[location.coordinates.lat, location.coordinates.lng]}
              >
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

      </div>
    );
}

export default Map;