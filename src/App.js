import React, { useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as countriesData from "./data/countries.json";
import mapStyles from "./mapStyles";

function Map() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [markers, setMarkers] = React.useState([]);
  const [selectedDest, setSelectedDest] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countriesData.features);

  const onMapClick = React.useCallback((event) => {
    setMarkers(current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    }]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Function to filter countries based on the search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredCountries = countriesData.features.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  };

  return (
    <GoogleMap 
      defaultZoom={12} 
      defaultCenter={{lat: 41.14961, lng: -8.61099}} 
      defaultOptions={{styles: mapStyles}}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {/* ...Markers and InfoWindows code... */}
      
      {/* Search Bar */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)} // Call the search function when the input changes
        />
      </div>

      {/* Render filtered countries */}
      {filteredCountries.map(country => (
        <Marker
          key={country.area}
          position={{
            lat: country.latlng[0],
            lng: country.latlng[1]
          }}
          onClick={() => {
            setSelectedCountry(country);
          }}
          icon={{
            url: country.flags.png,
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      ))}

     {selectedCountry &&  (
     <InfoWindow
      position={{
        lat: selectedCountry.latlng[0],
        lng: selectedCountry.latlng[1],
     }}
     onCloseClick={() => {
      setSelectedCountry(null);
     }}
  >
    <div>
    <h2>{selectedCountry.name.common}</h2>
    <p>Capital: {selectedCountry.capital}</p>
    <p>Languages: {Object.values(selectedCountry.languages).join(", ")}</p>
    <p>Currencies: {Object.values(selectedCountry.currencies).map(currency => currency.name).join(", ")}</p>
    <p>Time zone: {selectedCountry.timezones}</p>

    </div>
    </InfoWindow>
)}
    </GoogleMap>
    );
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map))

  export default function App() {
    return (
      //map takes up the entire sreen with w/h setting
    <div style={{width: '100vw', height: '100vh'}}>
      {/* loads higher component "withScripts(withGoogleMap)" */}
      <WrappedMap
      googleMapURL={`http://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDLIu9k9AhmQzJMKSCBS1l0lRZae5pIzmQ`}
        //  these three props is how we want the map to be displayed inside the div when the map renders
      loadingElement={<div style={{height:"100%"}}/>}
      containerElement={<div style={{height:"100%"}}/>}
      mapElement={<div style={{height:"100%"}}/>}
      />
    </div>
    )
  }
