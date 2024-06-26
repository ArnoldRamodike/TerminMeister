'use client'
import React from 'react'
import L from 'leaflet';
import { MapContainer, Marker, TileLayer} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

//@ts-ignore
delete L.Icon.Default.prototype._getIconnUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaURl: markerIcon2x.src,
    shadowUrl: markerShadow.src
})

interface MapProps{
    centre? : number[]
}

const Map: React.FC<MapProps> = ({centre}) => {
  return (
    <MapContainer center={centre as L.LatLngExpression || [51, -0.09]} 
     zoom={centre ? 4 : 2}
     scrollWheelZoom= {false}
     className='h-[35vh] rounded-lg'
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {centre &&  (
            <Marker 
                position={centre as L.LatLngExpression}
            />
        )}
    </MapContainer>
  )
}

export default Map