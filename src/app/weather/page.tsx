
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, Wind, Sun, Cloud, Zap as WeatherIcon, Sunrise, Sunset, Thermometer, Droplets } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { HourlyChart } from '@/components/hourly-chart';

const MiniMap = dynamic(() => import('@/components/mini-map'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  time: string;
}

interface DailyWeather {
  sunrise: string[];
  sunset: string[];
}
interface HourlyWeather {
    time: string[];
    temperature_2m: number[];
}

interface WeatherData {
  current_weather: CurrentWeather;
  daily: DailyWeather;
  hourly: HourlyWeather;
  timezone: string;
}

interface GeocodingResult {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  admin1?: string;
}

const getWeatherDescription = (code: number) => {
  const descriptions: { [key: number]: { label: string; icon: React.ElementType } } = {
    0: { label: 'Clear sky', icon: Sun }, 1: { label: 'Mainly clear', icon: Sun }, 2: { label: 'Partly cloudy', icon: Cloud }, 3: { label: 'Overcast', icon: Cloud }, 45: { label: 'Fog', icon: Cloud }, 48: { label: 'Depositing rime fog', icon: Cloud }, 51: { label: 'Light drizzle', icon: Cloud }, 53: { label: 'Moderate drizzle', icon: Cloud }, 55: { label: 'Dense drizzle', icon: Cloud }, 56: { label: 'Light freezing drizzle', icon: Cloud }, 57: { label: 'Dense freezing drizzle', icon: Cloud }, 61: { label: 'Slight rain', icon: Cloud }, 63: { label: 'Moderate rain', icon: Cloud }, 65: { label: 'Heavy rain', icon: Cloud }, 66: { label: 'Light freezing rain', icon: Cloud }, 67: { label: 'Heavy freezing rain', icon: Cloud }, 71: { label: 'Slight snow fall', icon: Cloud }, 73: { label: 'Moderate snow fall', icon: Cloud }, 75: { label: 'Heavy snow fall', icon: Cloud }, 77: { label: 'Snow grains', icon: Cloud }, 80: { label: 'Slight rain showers', icon: Cloud }, 81: { label: 'Moderate rain showers', icon: Cloud }, 82: { label: 'Violent rain showers', icon: Cloud }, 85: { label: 'Slight snow showers', icon: Cloud }, 86: { label: 'Heavy snow showers', icon: Cloud }, 95: { label: 'Thunderstorm', icon: WeatherIcon }, 96: { label: 'Thunderstorm with slight hail', icon: WeatherIcon }, 99: { label: 'Thunderstorm with heavy hail', icon: WeatherIcon },
  };
  return descriptions[code] || { label: 'Unknown', icon: Sun };
};


export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<GeocodingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localTime, setLocalTime] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (e?: React.FormEvent, selectedCity?: GeocodingResult) => {
    if (e) e.preventDefault();
    const cityToSearch = selectedCity?.name || city;
    if (!cityToSearch) return;

    setSuggestions([]);
    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    setLocation(null);

    try {
      const geoResult = selectedCity
        ? selectedCity
        : await (async () => {
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityToSearch)}`);
            const geoData = await geoResponse.json();
            if (!geoData.results || geoData.results.length === 0) {
              throw new Error('City not found. Please try another one.');
            }
            return geoData.results[0];
          })();

      setLocation(geoResult);
      setCity(`${geoResult.name}, ${geoResult.country}`);

      const { latitude, longitude } = geoResult;
      const weatherParams = 'current_weather=true&current=apparent_temperature,relative_humidity_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto';
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&${weatherParams}`);
      const weatherData = await weatherResponse.json();

      if (weatherData.error) {
        throw new Error(weatherData.reason || 'Failed to fetch weather data.');
      }

      setWeatherData(weatherData);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: GeocodingResult) => {
    setCity(`${suggestion.name}, ${suggestion.country}`);
    setSuggestions([]);
    handleSearch(undefined, suggestion);
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (weatherData) {
      const updateLocalTime = () => {
        const time = new Date().toLocaleTimeString('en-US', { timeZone: weatherData.timezone, hour: '2-digit', minute: '2-digit' });
        setLocalTime(time);
      };
      updateLocalTime();
      interval = setInterval(updateLocalTime, 60000);
    }
    return () => clearInterval(interval);
  }, [weatherData]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (city.trim().length > 2) {
      debounceTimeout.current = setTimeout(async () => {
        try {
          const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5`);
          const data = await response.json();
          if (data.results) {
            setSuggestions(data.results);
          }
        } catch (error) {
          console.error('Failed to fetch suggestions:', error);
        }
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [city]);

  const formatTime = (dateStr: string, timeZone: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {timeZone, hour: '2-digit', minute: '2-digit', hour12: true});
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto py-8 px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Live Weather Forecast
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Enter a city name below to get the current weather conditions and forecast.
            </p>
          </div>

          <div className="relative max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex justify-center gap-2 mb-1">
              <Input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="E.g., London, Tokyo, New York"
                className="flex-grow"
                autoComplete="off"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
              </Button>
            </form>
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-secondary border border-border rounded-md mt-1 shadow-lg">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.latitude + suggestion.longitude}
                    className="px-4 py-2 cursor-pointer hover:bg-accent"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}, {suggestion.admin1 ? `${suggestion.admin1}, ` : ''}{suggestion.country}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-center mt-8">
            {error && (
              <Alert variant="destructive" className="max-w-4xl">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {weatherData && location && (
              <Card className="w-full max-w-4xl bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-3xl text-center">
                    Weather in {location.name}, {location.country}
                  </CardTitle>
                   <p className="text-center text-muted-foreground text-lg">{localTime}</p>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
                    <div className="flex flex-col items-center justify-center text-center gap-2 p-4 rounded-lg bg-background/50">
                        {React.createElement(getWeatherDescription(weatherData.current_weather.weathercode).icon, { className: "h-16 w-16 text-primary" })}
                        <p className="font-bold text-5xl">{weatherData.current_weather.temperature}°C</p>
                        <p className="text-muted-foreground text-xl">{getWeatherDescription(weatherData.current_weather.weathercode).label}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                            <Thermometer className="h-8 w-8 text-primary"/>
                            <div>
                                <p className="text-muted-foreground">Feels Like</p>
                                <p className="font-bold text-xl">{weatherData.current_weather.apparent_temperature}°C</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                            <Droplets className="h-8 w-8 text-primary"/>
                            <div>
                                <p className="text-muted-foreground">Humidity</p>
                                <p className="font-bold text-xl">{weatherData.current_weather.relative_humidity_2m}%</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                            <Wind className="h-8 w-8 text-primary"/>
                            <div>
                                <p className="text-muted-foreground">Wind</p>
                                <p className="font-bold text-xl">{weatherData.current_weather.windspeed} km/h</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                            <Sunrise className="h-8 w-8 text-primary"/>
                            <div>
                                <p className="text-muted-foreground">Sunrise</p>
                                <p className="font-bold text-xl">{formatTime(weatherData.daily.sunrise[0], weatherData.timezone)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                             <Sunset className="h-8 w-8 text-primary"/>
                            <div>
                                <p className="text-muted-foreground">Sunset</p>
                                <p className="font-bold text-xl">{formatTime(weatherData.daily.sunset[0], weatherData.timezone)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-48 md:h-full rounded-lg overflow-hidden">
                      <MiniMap center={[location.latitude, location.longitude]} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-center mb-4">Hourly Forecast (24h)</h3>
                    <div className="h-60 w-full">
                       <HourlyChart data={weatherData.hourly} timezone={weatherData.timezone} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
