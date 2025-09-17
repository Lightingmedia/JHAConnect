'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PhoneOff } from 'lucide-react';
import type { User } from '@/lib/types';
import { Button } from "./ui/button";

export function CallModal({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent className="bg-background/80 backdrop-blur-md">
        <AlertDialogHeader className="items-center text-center">
          <AlertDialogTitle className="font-headline text-2xl">Calling {user.name}...</AlertDialogTitle>
          <div className="py-8">
            <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <AlertDialogDescription>
            Connecting via WebRTC. This is a placeholder for the call interface.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <Button variant="destructive" onClick={onClose} className="gap-2">
            <PhoneOff className="h-4 w-4" />
            End Call
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
