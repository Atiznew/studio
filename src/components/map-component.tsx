
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Destination } from '@/lib/types';
import { icon } from 'leaflet';

interface MapComponentProps {
    destination: Destination;
}

const ICON = icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


const MapComponent = ({ destination }: MapComponentProps) => {
    if (!destination.lat || !destination.lng) {
        return <div className="flex items-center justify-center h-full">Location data not available.</div>;
    }

    const position: [number, number] = [destination.lat, destination.lng];

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={ICON}>
                <Popup>
                    {destination.name}, {destination.country}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
