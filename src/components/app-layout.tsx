import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Users,
  Settings,
  Contact,
  Video,
  Church,
} from 'lucide-react';
import { UserNav } from '@/components/user-nav';
import { getAuthenticatedUser } from '@/lib/auth';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/directory', icon: Contact, label: 'Men' },
    { href: '/members', icon: Users, label: 'Members' },
    { href: '/meetings', icon: Video, label: 'Meetings' },
  ];

  if (user?.isAdmin) {
    navItems.push({ href: '/admin', icon: Settings, label: 'Admin' });
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold font-headline">
              <Users className="h-6 w-6" />
              <span className="">JHA Connect</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                 <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Mobile Nav would go here */}
          <div className="w-full flex-1" />
          <UserNav user={user} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
