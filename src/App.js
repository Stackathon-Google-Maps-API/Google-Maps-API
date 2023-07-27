import React from "react";
//importing googlemaps
//embedd google script so app can run properly
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import * as parksData from "./data/skateboard-parks.json";
//left off 13:30

  function Map() {
    //default zoom of initial map when app loads and coordates
    
    return (
    <GoogleMap defaultZoom={10} defaultCenter={{lat: 45.421532, lng:-75.697189}}
    >
    {/* embed marker into google maps data using skateboard-parks.json file */}
    {parksData.features.map(park =>(
    <Marker
    key={park.properties.PARK_ID}
    position={{
      lat: park.geometry.coordinates[1],
      lng: park.geometry.coordinates[0]
    }}
    />
    ))}
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
// testing


// import React, { useState, useEffect } from "react";
// import {
//   withGoogleMap,
//   withScriptjs,
//   GoogleMap,
//   Marker,
//   InfoWindow
// } from "react-google-maps";
// import * as parkData from "./data/skateboard-parks.json";
// import mapStyles from "./mapStyles";

// function Map() {
//   const [selectedPark, setSelectedPark] = useState(null);

//   useEffect(() => {
//     const listener = e => {
//       if (e.key === "Escape") {
//         setSelectedPark(null);
//       }
//     };
//     window.addEventListener("keydown", listener);

//     return () => {
//       window.removeEventListener("keydown", listener);
//     };
//   }, []);

//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
//       defaultOptions={{ styles: mapStyles }}
//     >
//       {parkData.features.map(park => (
//         <Marker
//           key={park.properties.PARK_ID}
//           position={{
//             lat: park.geometry.coordinates[1],
//             lng: park.geometry.coordinates[0]
//           }}
//           onClick={() => {
//             setSelectedPark(park);
//           }}
//           icon={{
//             url: `/skateboarding.svg`,
//             scaledSize: new window.google.maps.Size(25, 25)
//           }}
//         />
//       ))}

//       {selectedPark && (
//         <InfoWindow
//           onCloseClick={() => {
//             setSelectedPark(null);
//           }}
//           position={{
//             lat: selectedPark.geometry.coordinates[1],
//             lng: selectedPark.geometry.coordinates[0]
//           }}
//         >
//           <div>
//             <h2>{selectedPark.properties.NAME}</h2>
//             <p>{selectedPark.properties.DESCRIPTIO}</p>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   );
// }

// const MapWrapped = withScriptjs(withGoogleMap(Map));

// export default function App() {
//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <MapWrapped
//         googleMapURL={`https://gleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
//           process.env.REACT_APP_GOOGLE_KEY
//         }`}
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `100%` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     </div>
//   );
// }
