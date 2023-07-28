import React, { useState } from "react";
//importing googlemaps
//embedd google script so app can run properly
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
// import * as parksData from "./data/skateboard-parks.json";
// import * as airportsData from "./data/airports.json";
import * as countriesData from "./data/countries.json";
// import * as countriesData from './data/singlecountry.json';
import mapStyles from "./mapStyles";

const countryFlags = countriesData.features[0].flags;

  function Map() {
    //default zoom of initial map when app loads and coordates
    const [selectedPark, setSelectedPark] = useState(null);
    return (
    <GoogleMap defaultZoom={10} defaultCenter={{lat: 41.14961, lng: -8.61099}} defaultOptions={{styles: mapStyles}}
    >
    {/* embed marker into google maps data using skateboard-parks.json file */}
    {countriesData.features.map(country =>(
    <Marker
    key={country.area}
    position={{
      lat: country.latlng[0],
      lng: country.latlng[1]
    }}
    onClick = {() => {
      setSelectedPark(country);
    }}
    // icon={{
    //   url: '/skateboarding.svg',
    //   scaledSize: new window.google.maps.Size(25,25)
    //  }}
    // icon={{
    //   url: countryFlags.png, // Use the PNG version of the flag
    //   scaledSize: new window.google.maps.Size(25, 25),
    // }}
    icon={{
      url: country.flags.png, // Use the PNG version of the flag
      scaledSize: new window.google.maps.Size(25, 25),
    }}
    />
    ))}

     {selectedPark &&  (
     <InfoWindow
      position={{
        lat: selectedPark.latlng[0],
        lng: selectedPark.latlng[1],
     }}
     onCloseClick={() => {
      setSelectedPark(null);
     }}
  >
    <div>
    <h2>{selectedPark.name.common}</h2>
    <p>Languages: {Object.values(selectedPark.languages).join(", ")}</p>
    <p>Currencies: {Object.values(selectedPark.currencies).map(currency => currency.name).join(", ")}</p>
    <p>Population: {selectedPark.population}</p>

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
