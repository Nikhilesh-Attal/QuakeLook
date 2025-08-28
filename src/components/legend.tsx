"use client";

import { Card, CardContent } from './ui/card';

const getMarkerColor = (mag: number) => {
  if (mag >= 5) return '#ef4444'; // red-500
  if (mag >= 3) return '#f97316'; // orange-500
  return '#eab308'; // yellow-500
};

export const Legend = () => (
  <div className="leaflet-bottom leaflet-left">
    <div className="leaflet-control">
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <h3 className="mb-2 text-base font-bold">Magnitude</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white/50" style={{ backgroundColor: getMarkerColor(5) }} />
              <span>5.0+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white/50" style={{ backgroundColor: getMarkerColor(3) }} />
              <span>3.0 - 4.9</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white/50" style={{ backgroundColor: getMarkerColor(1) }} />
              <span>&lt; 3.0</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);
