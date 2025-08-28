
import { Zap, Linkedin, Twitter, Globe } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-6 py-8" style={{paddingLeft:"50px", paddingRight:"50px"}}>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <p className="text-lg font-bold">QuakeLook</p>
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <Link href="/map" className="hover:text-foreground">Map</Link>
            <Link href="/weather" className="hover:text-foreground">Weather</Link>
            <Link href="/about" className="hover:text-foreground">About</Link>
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/nikhilesh-attal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/AttalNikhilesh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="X"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://nikhilesh-attal-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Portfolio"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} QuakeLook. All rights reserved.</p>
          <p className="mt-1">Data from USGS & Open-Meteo APIs.</p>
        </div>
      </div>
    </footer>
  );
}
