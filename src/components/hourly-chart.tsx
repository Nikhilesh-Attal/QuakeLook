
"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useMemo } from 'react';

interface HourlyChartProps {
  data: {
    time: string[];
    temperature_2m: number[];
  };
  timezone: string;
}

export function HourlyChart({ data, timezone }: HourlyChartProps) {
  const chartData = useMemo(() => {
    return data.time.map((t, i) => ({
      time: new Date(t).toLocaleTimeString('en-US', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false }),
      temp: data.temperature_2m[i],
    })).slice(0, 24); // Ensure we only show 24 hours
  }, [data, timezone]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="time"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval={3}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}°C`}
          domain={['dataMin - 2', 'dataMax + 2']}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--foreground))',
            borderRadius: 'var(--radius)',
          }}
          labelStyle={{ fontWeight: 'bold' }}
          formatter={(value: number) => [`${value.toFixed(1)}°C`, 'Temperature']}
        />
        <Line type="monotone" dataKey="temp" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
