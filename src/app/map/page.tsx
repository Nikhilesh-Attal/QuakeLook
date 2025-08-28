'use client';

import { getEarthquakeData } from '@/lib/data';
import { QuakeMap } from '@/components/quake-map';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Header } from '@/components/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import type { ProcessedEarthquake } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function MapPage() {
  const [earthquakes, setEarthquakes] = useState<ProcessedEarthquake[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getEarthquakeData();
        setEarthquakes(data);
      } catch (e: any) {
        setError(e.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex flex-1">
          {error ? (
            <div className="container mx-auto flex flex-grow items-center justify-center py-12">
              <Alert variant="destructive" className="max-w-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Failed to Load Data</AlertTitle>
                <AlertDescription>
                  There was an error fetching the latest earthquake data: {error}
                </AlertDescription>
              </Alert>
            </div>
          ) : isLoading ? (
            <div className="flex-1 p-4"><Skeleton className="h-full w-full" /></div>
          ) : earthquakes ? (
            <QuakeMap earthquakes={earthquakes} />
          ) : null}
        </main>
      </div>
    </SidebarProvider>
  );
}
