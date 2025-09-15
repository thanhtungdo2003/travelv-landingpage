import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { useGencode } from '../contexts/gencode';

function LocationMarker() {
  const {latLng, setLatLng} = useGencode();
  useMapEvents({
    click(e) {
      setLatLng(e.latlng);
    },
  });

  return latLng === null ? null : (
    <Marker position={latLng}></Marker>
  );
}

function MapPicker() {
  return (
    <MapContainer center={[10.762622, 106.660172]} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default MapPicker;
