'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/lib/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from './ui/dialog';

interface MemberFormProps {
  user: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const emptyUser: Omit<User, 'id'> = {
    name: '',
    phone: '',
    birthday: { month: 1, day: 1 },
    profilePicture: `https://picsum.photos/seed/${Date.now()}/200/200`,
    profileDetails: '',
    isAdmin: false
};

export function MemberForm({ user, onSave, onCancel }: MemberFormProps) {
  const [formData, setFormData] = useState<Omit<User, 'id'>>(user || emptyUser);

  useEffect(() => {
    setFormData(user || emptyUser);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      birthday: { ...prev.birthday, [name]: parseInt(value) },
    }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isAdmin: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userToSave = {
        ...formData,
        id: user?.id || String(Date.now()),
    };
    onSave(userToSave);
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{user ? 'Edit Member' : 'Add New Member'}</DialogTitle>
          <DialogDescription>
            {user ? 'Update the details for this community member.' : 'Enter the details for the new community member.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Birthday</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
                <Input id="birthday-month" name="month" type="number" min="1" max="12" placeholder="Month" value={formData.birthday.month} onChange={handleBirthdayChange} />
                <Input id="birthday-day" name="day" type="number" min="1" max="31" placeholder="Day" value={formData.birthday.day} onChange={handleBirthdayChange} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profileDetails" className="text-right">Details</Label>
            <Textarea id="profileDetails" name="profileDetails" value={formData.profileDetails} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isAdmin" className="text-right">Admin</Label>
            <div className="col-span-3 flex items-center">
                <Checkbox id="isAdmin" checked={formData.isAdmin} onCheckedChange={handleCheckboxChange} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
