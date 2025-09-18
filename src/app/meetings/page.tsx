'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Video, Copy, Check, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MeetingsPage() {
  const [meetingLink, setMeetingLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const { toast } = useToast();

  const generateMeetingLink = () => {
    const newMeetingId = `jha-connect-${Math.random().toString(36).substring(2, 11)}`;
    const link = `${window.location.origin}/meetings/join/${newMeetingId}`;
    setMeetingLink(link);
    setIsMeetingActive(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    toast({
        title: 'Copied to Clipboard!',
        description: 'You can now share the meeting link.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const endMeeting = () => {
    setMeetingLink('');
    setIsMeetingActive(false);
  }

  return (
    <div className="flex justify-center items-start pt-8">
      <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
            <Video className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline pt-4">Community Meetings</CardTitle>
          <CardDescription>
            {isMeetingActive ? "Your meeting is active. Share the link below." : "Create an instant meeting and share the link with others."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isMeetingActive ? (
            <div className="space-y-4">
                 <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                    <div className="text-center">
                        <Users className="h-16 w-16 mx-auto text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">This is a placeholder for the video call interface.</p>
                    </div>
                </div>
                <div className="relative">
                    <Input value={meetingLink} readOnly />
                    <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={copyToClipboard}
                    >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                <p className="text-muted-foreground">Click below to start a new meeting.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            {isMeetingActive ? (
                 <Button className="w-full" variant="destructive" onClick={endMeeting}>
                    End Meeting
                </Button>
            ) : (
                <Button className="w-full" onClick={generateMeetingLink}>
                    <Video className="mr-2 h-4 w-4" /> Start New Meeting
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
