
import { Header } from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Github, Linkedin, Twitter, Globe, Filter, CloudSun } from 'lucide-react';

export default function AboutPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1">
          <section className="container mx-auto py-12 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                About QuakeLook
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                QuakeLook is a web application that helps users explore global earthquake activity and check real-time weather conditions. It was built to demonstrate skills in frontend development, API integration, and UI/UX design, combining seismic monitoring and live weather insights in one accessible platform.
              </p>
            </div>
            
            <div className="mx-auto mt-12 max-w-4xl">
                <h3 className="mb-6 text-center text-xl font-semibold text-foreground">Key Features</h3>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Globe className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Interactive Map</h4>
                            <p className="text-sm text-muted-foreground">Visualize real-time seismic activity.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Filter className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Magnitude Filtering</h4>
                            <p className="text-sm text-muted-foreground">Focus on the quakes that matter most.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <CloudSun className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Live Weather</h4>
                            <p className="text-sm text-muted-foreground">Check forecasts for any city.</p>
                        </div>
                    </div>
                </div>
            </div>

             <div className="mx-auto mt-16 max-w-3xl text-center">
                <h3 className="mb-4 text-xl font-semibold text-foreground">Technology Stack</h3>
                <p className="text-muted-foreground">
                    Built with Next.js (React), Tailwind CSS, React-Leaflet, and public APIs (USGS + Open-Meteo).
                </p>
            </div>
          </section>

          <section className="bg-secondary py-12 md:py-24">
            <div className="container mx-auto">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  The Creator
                </h2>
              </div>

              <div className="mt-10 flex justify-center">
                <Card className="w-full max-w-sm">
                  <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Nikhilesh Attal"
                      />
                      <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">Nikhilesh Attal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Frontend developer focused on building functional, user-friendly applications with modern web technologies.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                      <a
                        href="https://www.linkedin.com/in/nikhilesh-attal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                      <a
                        href="https://x.com/AttalNikhilesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Twitter className="h-6 w-6" />
                      </a>
                      <a
                        href="https://nikhilesh-attal-portfolio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Globe className="h-6 w-6" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}
