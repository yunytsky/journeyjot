import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, map.getZoom());
      }
    }, [center, map]);
  
    return null; // This component does not render anything visible
};

export default MapView;
  