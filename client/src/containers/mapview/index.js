import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";
import { GOOGLE_MAP_API_KEY } from "../../api";

export const Mapview = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, minHeight: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={2} defaultCenter={{ lat: 28.7041, lng: 77.1025 }}>
    {props.isMarkerShown &&
      props.markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: parseInt(marker.lat), lng: parseInt(marker.long) }}
          onClick={() => props.onMarkerTapped(marker, index)}
        >
          {marker.isActive && (
            <InfoWindow
              onCloseClick={() => props.onMarkerTapped(marker, index)}
            >
              <img src={marker.avatar} alt="should be marker name" />
              texttata
            </InfoWindow>
          )}
        </Marker>
      ))}
  </GoogleMap>
));
