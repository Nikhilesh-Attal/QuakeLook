"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Legend } from './legend';
import type { ProcessedEarthquake } from '@/lib/types';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

interface QuakeMapLeafletProps {
  earthquakes: ProcessedEarthquake[];
  center: [number, number];
  zoom: number;
}

const getMarkerStyle = (mag: number) => {
  let color = '#eab308'; // yellow-500
  if (mag >= 5) color = '#ef4444'; // red-500
  else if (mag >= 3) color = '#f97316'; // orange-500

  return {
    backgroundColor: color,
  };
};

function MapViewUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      animate: true,
      duration: 1.5
    });
  }, [center, zoom, map]);
  return null;
}

export default function QuakeMapLeaflet({ earthquakes, center, zoom }: QuakeMapLeafletProps) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full rounded-lg bg-background">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewUpdater center={center} zoom={zoom} />
      {earthquakes.map((quake) => (
        <CircleMarker
          key={quake.id}
          center={[quake.lat, quake.lng]}
          pathOptions={{
            color: 'white',
            weight: 0.5,
            fillColor: getMarkerStyle(quake.mag).backgroundColor,
            fillOpacity: 0.7,
          }}
          radius={Math.max(quake.mag * 3, 5)}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-bold">{quake.place}</p>
              <p>
                <strong>Magnitude:</strong> {quake.mag.toFixed(2)}
              </p>
              <p>
                <strong>Time:</strong>{' '}
                {new Date(quake.time).toLocaleString()}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
      <Legend />
    </MapContainer>
  );
}
