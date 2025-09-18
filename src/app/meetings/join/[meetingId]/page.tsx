'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Copy, Check, VideoOff, MicOff, PhoneOff, AlertTriangle } from 'lucide-react';

export default function JoinMeetingPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const params = useParams();
  const meetingId = params.meetingId as string;

  const meetingLink = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    const getCameraPermission = async () => {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support video calls.',
        });
        return;
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Media Access Denied',
          description: 'Please enable camera and microphone permissions in your browser settings.',
        });
      }
    };

    getCameraPermission();

    return () => {
        // Cleanup: stop media tracks when component unmounts
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    toast({
        title: 'Copied to Clipboard!',
        description: 'You can now share the meeting link.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const leaveMeeting = () => {
    window.location.href = '/meetings';
  }

  return (
    <div className="flex justify-center items-center min-h-full">
      <Card className="w-full max-w-4xl bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline">Meeting: {meetingId}</CardTitle>
          <CardDescription>You are in the video call. This is a demonstration of camera access.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden">
             <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            
            {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                    <AlertTriangle className="h-12 w-12 text-yellow-400 mb-4" />
                    <h3 className="text-xl font-bold">Camera Access Required</h3>
                    <p>Please grant camera and microphone permissions to join the call.</p>
                </div>
            )}
            {hasCameraPermission === null && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Requesting camera access...</p>
                </div>
            )}
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
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-4">
            <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full">
                <MicOff />
            </Button>
            <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full">
                <VideoOff />
            </Button>
            <Button variant="destructive" size="lg" className="rounded-full gap-2" onClick={leaveMeeting}>
                <PhoneOff />
                Leave Call
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
