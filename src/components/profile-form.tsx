'use client';

import { useActionState, useEffect } from 'react';
import type { User } from '@/lib/types';
import { updateUser } from '@/lib/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Changes'}
    </Button>
  );
}

export function ProfileForm({ user }: { user: User }) {
  const { toast } = useToast();

  const updateUserWithToast = async (prevState: any, formData: FormData) => {
    // This action is designed to be used with useActionState.
    // It creates a user object from the form data and calls the server action.
    const updatedUser: User = {
      ...user,
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      profileDetails: formData.get('profileDetails') as string,
      birthday: {
        month: parseInt(formData.get('birthday-month') as string),
        day: parseInt(formData.get('birthday-day') as string),
      }
    };
    
    try {
        await updateUser(updatedUser);
        return { message: "Profile Updated", description: "Your profile information has been saved." };
    } catch (error) {
        return { message: "Update Failed", description: "Could not save your profile.", error: true };
    }
  };

  const [state, formAction] = useActionState(updateUserWithToast, null);
  
  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.message,
        description: state.description,
        variant: state.error ? 'destructive' : 'default',
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="grid gap-6">
      <div className="flex items-center gap-6">
        <Image 
            src={user.profilePicture}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full"
        />
        <div className="flex-1 space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={user.name} />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" defaultValue={user.phone} />
      </div>
      <div className="space-y-1">
        <Label>Birthday</Label>
        <div className="grid grid-cols-2 gap-2">
            <Input id="birthday-month" name="birthday-month" type="number" min="1" max="12" placeholder="Month" defaultValue={user.birthday.month} />
            <Input id="birthday-day" name="day" type="number" min="1" max="31" placeholder="Day" defaultValue={user.birthday.day} />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="profileDetails">Profile Details</Label>
        <Textarea id="profileDetails" name="profileDetails" defaultValue={user.profileDetails} />
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
