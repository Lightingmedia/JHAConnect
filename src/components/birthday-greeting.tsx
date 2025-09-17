'use client';

import { useEffect, useState } from 'react';
import { getAIBirthdayGreeting } from '@/lib/actions';
import type { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export default function BirthdayGreeting({ member }: { member: User }) {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGreeting() {
      const today = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      const generatedGreeting = await getAIBirthdayGreeting({
        memberName: member.name,
        birthdayMonth: monthNames[today.getMonth()],
        birthdayDay: String(today.getDate()),
        profileDetails: member.profileDetails,
      });
      setGreeting(generatedGreeting);
      setLoading(false);
    }
    fetchGreeting();
  }, [member]);

  return (
    <Card className="bg-accent/30 border-accent">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Gift className="text-accent-foreground" />
          Happy Birthday, {member.name}!
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p className="text-accent-foreground/90">{greeting || `Wishing you a fantastic day, ${member.name}!`}</p>
        )}
      </CardContent>
    </Card>
  );
}
