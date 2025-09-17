'use client';

import { useState } from 'react';
import Image from 'next/image';
import { communityUsers } from '@/lib/data';
import type { User } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CallModal } from '@/components/call-modal';

export default function DirectoryPage() {
  const [sortedUsers, setSortedUsers] = useState<User[]>([...communityUsers]);
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [callingUser, setCallingUser] = useState<User | null>(null);

  const sortUsers = (value: string) => {
    setSortOrder(value);
    const sorted = [...communityUsers].sort((a, b) => {
      if (value === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (value === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    setSortedUsers(sorted);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">Member Directory</h1>
        <div className="w-48">
          <Select value={sortOrder} onValueChange={sortUsers}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedUsers.map((user) => (
          <Card key={user.id} className="flex flex-col bg-background/80 backdrop-blur-sm">
            <CardHeader className="items-center text-center">
              <Image
                src={user.profilePicture}
                alt={user.name}
                width={96}
                height={96}
                className="rounded-full w-24 h-24 object-cover border-4 border-primary"
              />
              <CardTitle className="pt-2 font-headline">{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
               <p className="text-sm text-muted-foreground text-center">{user.profileDetails}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setCallingUser(user)}>
                <Phone className="mr-2 h-4 w-4" /> Call Member
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {callingUser && (
        <CallModal user={callingUser} onClose={() => setCallingUser(null)} />
      )}
    </div>
  );
}
