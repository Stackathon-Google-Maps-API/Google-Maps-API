import React, { useState } from "react";
//importing googlemaps
//embedd google script so app can run properly
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
// import * as parksData from "./data/skateboard-parks.json";
import * as airportsData from "./data/airports.json";


import mapStyles from "./mapStyles";

  function Map() {
    //default zoom of initial map when app loads and coordates
    const [selectedPark, setSelectedPark] = useState(null);
    return (
    <GoogleMap defaultZoom={10} defaultCenter={{lat: 51.509865, lng:-0.118092}} defaultOptions={{styles: mapStyles}}
    >
    {/* embed marker into google maps data using skateboard-parks.json file */}
    {airportsData.features.map(airport =>(
    <Marker
    key={airport.AIRPORT_ID}
    position={{
      lat: airport.latitude,
      lng: airport.longitude
    }}
    onClick = {() => {
      setSelectedPark(airport);
    }}
    icon={{
      url: '/skateboarding.svg',
      scaledSize: new window.google.maps.Size(25,25)
     }}
    />
    ))}

     {selectedPark &&  (
     <InfoWindow
      position={{
      lat: selectedPark.latitude,
      lng: selectedPark.longitude
     }}
     onCloseClick={() => {
      setSelectedPark(null);
     }}
  >
    <div>
    <h2>{selectedPark.name}</h2>
    <p>{selectedPark.features.DESCRIPTIO}</p>

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
