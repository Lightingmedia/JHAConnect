'use client';

import { useEffect, useState, useActionState } from 'react';
import { getAIBirthdayGreeting, sendWhatsAppMessage } from '@/lib/actions';
import type { User } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, MessageSquareText } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useFormStatus } from 'react-dom';


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            <MessageSquareText className="mr-2 h-4 w-4" />
            {pending ? 'Sending...' : 'Send WhatsApp Greeting'}
        </Button>
    );
}

export default function BirthdayGreeting({ member }: { member: User }) {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchGreeting() {
      const today = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      try {
        const generatedGreeting = await getAIBirthdayGreeting({
          memberName: member.name,
          birthdayMonth: monthNames[today.getMonth()],
          birthdayDay: String(today.getDate()),
          profileDetails: member.profileDetails,
        });
        setGreeting(generatedGreeting);
      } catch (error) {
        console.error("Failed to generate birthday greeting:", error);
        setGreeting(`Happy Birthday, ${member.name}! Wishing you a fantastic day.`);
      } finally {
        setLoading(false);
      }
    }
    fetchGreeting();
  }, [member]);

  const handleSendWhatsApp = async () => {
    if (!greeting) return;

    const result = await sendWhatsAppMessage(member.phone, greeting);
    
    if (result.success) {
      toast({
        title: "Message Sent!",
        description: `Birthday greeting sent to ${member.name} via WhatsApp.`,
      });
    } else {
      toast({
        title: "Message Failed",
        description: result.error || "Could not send WhatsApp message.",
        variant: "destructive",
      });
    }
  };

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
          <p className="text-accent-foreground/90">{greeting}</p>
        )}
      </CardContent>
      <CardFooter>
          <form action={handleSendWhatsApp}>
             <SubmitButton />
          </form>
      </CardFooter>
    </Card>
  );
}
