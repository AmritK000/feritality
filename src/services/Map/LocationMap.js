import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import useLoadGoogleMapsScript from './useLoadGoogleMapsScript'; // Adjust the path as needed
const { GOOGLE_MAP_API } = require('../../config/constants');
const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const LocationMap = ({ latitude, longitude, setAddEditSata }) => {
  const [selected, setSelected] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const isScriptLoaded = useLoadGoogleMapsScript(GOOGLE_MAP_API);

  useEffect(() => {
    console.log("Latitude and Longitude updated:", latitude, longitude);
    if (latitude && longitude) {
      setSelected({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (!selected && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User location fetched:", latitude, longitude);
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error fetching user location:', error);
          setUserLocation({ lat: 0, lng: 0 }); // Fallback to default location
        }
      );
    }
  }, [selected, userLocation]);

  const center = selected || userLocation;

  const handleMapClick = (event) => {
    try {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelected({ lat: lat, lng: lng });
      setAddEditSata((pre)=>({
        ...pre,
        latitude : lat, 
        longitude : lng
      }))
    } catch (error) {
      
    }
  }

  return (
    <>
      {isScriptLoaded && center ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          onClick={handleMapClick}
        >
          <Marker position={center} key={`${center.lat}-${center.lng}`} />
        </GoogleMap>
      ) : (
        <div>Loading map...</div>
      )}
    </>
  );
};

LocationMap.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default LocationMap;
