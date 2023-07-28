import React, { useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as countriesData from "./data/countries.json";
import mapStyles from "./mapStyles";

function Map() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [markers, setMarkers] = React.useState([]);
  const [selectedDest, setSelectedDest] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countriesData.info);

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
    const filteredCountries = countriesData.info.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  };

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 41.14961, lng: -8.61099 }}
      defaultOptions={{ styles: mapStyles }}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.time.toISOString()}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: '/airplane.png',
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15)
          }}
          onClick={() => {
            setSelectedDest(marker)
          }}
        />
      ))}

      {selectedDest ? (<InfoWindow position={{ lat: selectedDest.lat, lng: selectedDest.lng }}
        onCloseClick={() => {
          setSelectedDest(null)
        }}
      >
        <div>
          <h2>I want to travel here!</h2>
        </div>
      </InfoWindow>) : null}

      {/* Search Bar */}
      <div className="searchBarContainer">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="searchBarField"
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

      {selectedCountry && (
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
            <p>Time zones: {Object.values(selectedCountry.timezones).join(", ")}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function App() {
  return (
    //map takes up the entire sreen with w/h settings
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* loads higher component "withScripts(withGoogleMap)" */}
      <WrappedMap
        googleMapURL={`http://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDLIu9k9AhmQzJMKSCBS1l0lRZae5pIzmQ`}
        //  these three props are how we want the map to be displayed inside the div when the map renders
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  )
}
