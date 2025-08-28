"use client";

import type { ProcessedEarthquake } from '@/lib/types';
import 'leaflet/dist/leaflet.css';
import { QuakeMap } from '@/components/quake-map';

interface QuakeMapLoaderProps {
    earthquakes: ProcessedEarthquake[];
}

export function QuakeMapLoader({ earthquakes }: QuakeMapLoaderProps) {
  return <QuakeMap earthquakes={earthquakes} />;
}
