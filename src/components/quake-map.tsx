"use client";

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProcessedEarthquake } from '@/lib/types';
import { CardTitle } from '@/components/ui/card';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset } from './ui/sidebar';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

function MapComponentSkeleton() {
  return <Skeleton className="h-full w-full" />;
}

// Dynamically import the map component to avoid SSR issues with Leaflet
const QuakeMapLeaflet = dynamic(() => import('./quake-map-leaflet'), {
  ssr: false,
  loading: () => <MapComponentSkeleton />,
});

interface QuakeMapProps {
  earthquakes: ProcessedEarthquake[];
}

const getMagnitudeColor = (mag: number) => {
  if (mag >= 5) return 'text-red-500';
  if (mag >= 3) return 'text-orange-500';
  return 'text-yellow-500';
};


export function QuakeMap({ earthquakes }: QuakeMapProps) {
  const [magnitudeFilter, setMagnitudeFilter] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [mapZoom, setMapZoom] = useState(2.5);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredEarthquakes = useMemo(() => {
    let filtered = earthquakes;
    if (magnitudeFilter > 0) {
      filtered = earthquakes.filter((quake) => quake.mag >= magnitudeFilter);
    }
    // Sort by magnitude descending
    return filtered.sort((a, b) => b.mag - a.mag);
  }, [earthquakes, magnitudeFilter]);
  
  const handleQuakeClick = (quake: ProcessedEarthquake) => {
    setMapCenter([quake.lat, quake.lng]);
    setMapZoom(5);
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <CardTitle className="p-4 pb-0">Filter & Events</CardTitle>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-4 p-4">
            <div>
              <Label htmlFor="magnitude-select" className="mb-2 block text-sm font-medium text-muted-foreground">
                Minimum Magnitude
              </Label>
              <Select
                value={String(magnitudeFilter)}
                onValueChange={(value) => setMagnitudeFilter(Number(value))}
              >
                <SelectTrigger id="magnitude-select" className="w-full">
                  <SelectValue placeholder="Filter by magnitude" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All Magnitudes</SelectItem>
                  <SelectItem value="3">Magnitude 3+</SelectItem>
                  <SelectItem value="5">Magnitude 5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
           <ScrollArea className="h-[calc(100%_-_150px)]">
             <div className="p-4">
               <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                 Recent Earthquakes ({filteredEarthquakes.length})
               </h3>
               <ul className="space-y-3">
                 {filteredEarthquakes.map((quake) => (
                   <li key={quake.id} className="group flex cursor-pointer items-start gap-3 rounded-md p-2 text-sm hover:bg-accent"
                   onClick={() => handleQuakeClick(quake)}
                   >
                     <span className={`font-bold ${getMagnitudeColor(quake.mag)} w-8`}>
                       {quake.mag.toFixed(1)}
                     </span>
                     <div className="flex-1">
                       <p className="font-medium leading-tight text-foreground">{quake.place}</p>
                       <p className="text-xs text-muted-foreground mt-1">
                         {new Date(quake.time).toLocaleString()}
                       </p>
                     </div>
                   </li>
                 ))}
               </ul>
             </div>
           </ScrollArea>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="relative h-[calc(100vh_-_3.5rem)] w-full flex-1">
          {isClient ? (
            <QuakeMapLeaflet earthquakes={filteredEarthquakes} center={mapCenter} zoom={mapZoom} />
          ) : (
            <MapComponentSkeleton />
          )}
        </div>
      </SidebarInset>
    </>
  );
}
