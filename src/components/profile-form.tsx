'use client';

import { useActionState, useEffect, useState, useRef } from 'react';
import type { User } from '@/lib/types';
import { updateUser } from '@/lib/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Upload } from 'lucide-react';

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
  const [imagePreview, setImagePreview] = useState<string | null>(user.profilePicture);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateUserWithToast = async (prevState: any, formData: FormData) => {
    // This action is designed to be used with useActionState.
    // It creates a user object from the form data and calls the server action.
    
    // In a real app, you would handle file upload to a storage service (e.g., Firebase Storage)
    // and get a URL back. For this demo, we'll just simulate it with a new placeholder.
    const hasNewImage = (formData.get('profilePicture') as File)?.size > 0;
    
    const updatedUser: User = {
      ...user,
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      profileDetails: formData.get('profileDetails') as string,
      birthday: {
        month: parseInt(formData.get('birthday-month') as string),
        day: parseInt(formData.get('birthday-day') as string),
      },
      profilePicture: hasNewImage ? `https://picsum.photos/seed/${Date.now()}/200/200` : user.profilePicture
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action={formAction} className="grid gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
            <Image 
                src={imagePreview || user.profilePicture}
                alt={user.name}
                width={96}
                height={96}
                className="rounded-full w-24 h-24 object-cover"
            />
            <Button 
                type="button" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload new picture</span>
            </Button>
            <Input 
                id="profilePicture" 
                name="profilePicture" 
                type="file" 
                className="hidden" 
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
            />
        </div>
        <div className="flex-1 w-full space-y-1">
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
