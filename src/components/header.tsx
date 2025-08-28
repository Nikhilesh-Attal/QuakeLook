
'use client';

import Link from 'next/link';
import { Filter, Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useSidebar } from './ui/sidebar';

export function Header() {
  const pathname = usePathname();
  // useSidebar hook can cause errors if the component is not wrapped in a SidebarProvider.
  // We can only call it when we are on the map page.
  const { toggleSidebar } = useSidebar();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/map', label: 'Map' },
    { href: '/weather', label: 'Weather' },
    { href: '/about', label: 'About' },
  ];

  const isMapPage = pathname === '/map';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center" style={{paddingLeft:"15px", paddingRight:"15px"}}>
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold">QuakeLook</span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          {isMapPage && (
             <Button variant="outline" size="sm" onClick={toggleSidebar}>
                <Filter className="mr-2 h-4 w-4" />
                Filter
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
