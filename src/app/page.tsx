
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, Filter, CloudSun, Zap } from 'lucide-react';
import { Header } from '@/components/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function HomePage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1" style={{paddingLeft:"50px", paddingRight:"50px"}}>
          {/* Hero Section */}
          <section className="relative flex h-[80vh] min-h-[500px] w-full items-center justify-center">
            <Image
              src="https://picsum.photos/1920/1080"
              alt="World map showing tectonic plates"
              fill
              className="object-cover"
              data-ai-hint="world map"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-primary-foreground">
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                QuakeLook 🌍
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-light text-foreground/80">
                Track Earthquakes. Check the Weather. Stay Informed.
              </p>
              <div className="mt-8 flex gap-4">
                <Button asChild size="lg">
                  <Link href="/map">
                    <Globe className="mr-2 h-5 w-5" /> View Earthquakes
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/weather">
                    <CloudSun className="mr-2 h-5 w-5" /> Check Weather
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Features at a Glance
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Everything you need to stay informed about our planet.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="transform rounded-lg border bg-card p-6 text-center shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    Interactive Map
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    Track real-time earthquakes on an interactive world map.
                  </p>
                </div>
                <div className="transform rounded-lg border bg-card p-6 text-center shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto">
                    <Filter className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    Magnitude Filtering
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    Filter seismic activity by magnitude for clarity.
                  </p>
                </div>
                <div className="transform rounded-lg border bg-card p-6 text-center shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto">
                    <CloudSun className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    Live Weather
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    Instantly check weather conditions anywhere in the world.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Why QuakeLook Section */}
          <section className="bg-secondary py-16 md:py-24" style={{paddingLeft:"50px", paddingRight:"50px"}}>
            <div className="container mx-auto">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Why QuakeLook?
                </h2>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span>🚨</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Real-time Alerts</h3>
                    <p className="mt-1 text-muted-foreground">Access the latest earthquake data as it happens.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span>🌐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Reliable APIs</h3>
                    <p className="mt-1 text-muted-foreground">Powered by free and trusted data sources.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span>⚡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Clarity and Speed</h3>
                    <p className="mt-1 text-muted-foreground">Designed for a fast, intuitive, and clear user experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </SidebarProvider>
  );
}
