'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

export default function MeetingsPage() {
  const router = useRouter();

  const generateMeeting = () => {
    const newMeetingId = `jha-connect-${Math.random().toString(36).substring(2, 11)}`;
    router.push(`/meetings/join/${newMeetingId}`);
  };

  return (
    <div className="flex justify-center items-start pt-8">
      <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
            <Video className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline pt-4">Community Meetings</CardTitle>
          <CardDescription>
            Create an instant meeting and share the link with others.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
              <p className="text-muted-foreground text-center">Click below to start a new meeting and get a shareable link.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" onClick={generateMeeting}>
                <Video className="mr-2 h-4 w-4" /> Start New Meeting
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
