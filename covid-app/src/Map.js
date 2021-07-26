import React from 'react';
import "./Map.css";
import {MapContainer , TileLayer, useMap} from 'react-leaflet';
import {showDataOnMap} from "./util";

function Map({ countries, casesType, center, zoom }) {


    return (
       
        <MapContainer
        casesType={casesType}
        className="map"
        center={center}
        zoom={zoom}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreet</a> contributors'
            />
            {/* Loop through all countries and draw circles */}
            {showDataOnMap(countries,casesType)}
        </MapContainer>
    )
}

export default Map;
