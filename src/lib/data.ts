import type { ProcessedEarthquake, EarthquakeFeature, EarthquakeData } from '@/lib/types';

export async function getEarthquakeData(): Promise<ProcessedEarthquake[]> {
  const response = await fetch(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    { next: { revalidate: 300 } } // Revalidate every 5 minutes
  );

  if (!response.ok) {
    throw new Error('Failed to fetch earthquake data from USGS API.');
  }

  const data: EarthquakeData = await response.json();

  return data.features.map((feature: EarthquakeFeature) => ({
    id: feature.id,
    mag: feature.properties.mag,
    place: feature.properties.place,
    time: feature.properties.time,
    lng: feature.geometry.coordinates[0],
    lat: feature.geometry.coordinates[1],
  }));
}
