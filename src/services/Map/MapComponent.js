import React, { useRef, useEffect, useState } from "react";
import { autoCompleteAddress, fetchLatLngByPlceId } from '../../controllers/API';
import { Link } from "react-router-dom";

const MapComponent = ({ setAddNewAddress }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimeout = useRef(null);
  const [placeId, setPlaceID] = useState('');
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear previous debounce timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new debounce timeout
    debounceTimeout.current = setTimeout(() => {
      if (value.trim() !== "") {
        fetchAutoCompleteSuggestions(value);
      }
    }, 500); // Delay the API call by 500ms
  };

  const fetchAutoCompleteSuggestions = async (query) => {
    try {
      const response = await autoCompleteAddress(query);
      console.log('response', response);
      setSuggestions(response); // Assuming the response contains suggestions
    } catch (error) {
      console.error("Error fetching autocomplete suggestions", error);
    }
  };
  const handleSelectAddress = async (item) => {
    try {
      setInputValue(item.address);
      const res = await fetchLatLngByPlceId(item.placeId);
      if (res.status === true) {
        setAddNewAddress((pre) => ({
          ...pre,
          latitude: res?.result?.latitude,
          longitude: res?.result?.longitude,
          city: item?.mainText
        }))
      }
    } catch (error) {

    }
  }
  return (
    <>
      <div className="col-md-12">
        <input
          className="form-field"
          name="address"
          value={inputValue}
          placeholder="Search address"
          onInput={handleInputChange}
        />
        {(suggestions && suggestions?.length > 0) && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index}><Link to='javaScript:void(0)' onClick={() => handleSelectAddress(suggestion)} >{suggestion.address}</Link></li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MapComponent;
