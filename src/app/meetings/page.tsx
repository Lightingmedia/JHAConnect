'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Video, Copy, Check, Calendar as CalendarIconComponent } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function MeetingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));
  const [scheduledMeeting, setScheduledMeeting] = useState<{ link: string; topic: string; dateTime: Date } | null>(null);
  const [copied, setCopied] = useState(false);

  // Use a placeholder for the public domain.
  // The development URL (window.location.origin) is not shareable.
  const public_url = 'https://your-deployed-app.com';

  const generateMeeting = () => {
    const newMeetingId = `jha-connect-${Math.random().toString(36).substring(2, 11)}`;
    router.push(`/meetings/join/${newMeetingId}`);
  };

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !date) return;

    const [hours, minutes] = time.split(':').map(Number);
    const scheduledDateTime = new Date(date);
    scheduledDateTime.setHours(hours, minutes);

    const meetingId = `scheduled-${topic.replace(/\s+/g, '-').toLowerCase()}-${Math.random().toString(36).substring(2, 7)}`;
    const meetingLink = `${public_url}/meetings/join/${meetingId}`;
    
    setScheduledMeeting({
        link: meetingLink,
        topic: topic,
        dateTime: scheduledDateTime,
    });
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast({
        title: 'Copied to Clipboard!',
        description: 'You can now share the meeting link.',
    });
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <>
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="w-full bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
            <Video className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline pt-4">Instant Meeting</CardTitle>
          <CardDescription>
            Create an instant meeting room and share the link with others.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
              <p className="text-muted-foreground text-center">Click below to start a new meeting right away.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" onClick={generateMeeting}>
                <Video className="mr-2 h-4 w-4" /> Start New Meeting
            </Button>
        </CardFooter>
      </Card>
      
      <Card className="w-full bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
            <CalendarIconComponent className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline pt-4">Schedule a Meeting</CardTitle>
          <CardDescription>
            Plan a meeting for a future date and time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleScheduleMeeting} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input 
                id="topic" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Weekly Check-in"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                 <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
              </div>
               <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
              </div>
            </div>
             <Button type="submit" className="w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Meeting
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

    {scheduledMeeting && (
        <AlertDialog open onOpenChange={() => setScheduledMeeting(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-headline">Meeting Scheduled!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your meeting has been scheduled. Share the link below with participants.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4 space-y-4">
                    <p><strong className="font-semibold">Topic:</strong> {scheduledMeeting.topic}</p>
                    <p><strong className="font-semibold">When:</strong> {format(scheduledMeeting.dateTime, 'PPP p')}</p>
                     <div className="relative">
                        <Input value={scheduledMeeting.link} readOnly />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                            onClick={() => copyToClipboard(scheduledMeeting.link)}
                        >
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setScheduledMeeting(null)}>Done</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )}
    </>
  );
}
