'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { communityUsers as initialUsers } from '@/lib/data';
import type { User } from '@/lib/types';
import { MemberForm } from '@/components/member-form';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { addUser, deleteUser, updateUser } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

export default function MemberManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null | 'new'>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleSave = async (userToSave: User) => {
    if (editingUser === 'new') {
      await addUser(userToSave);
      toast({ title: "Member Added", description: `${userToSave.name} has been added to the community.` });
    } else {
      await updateUser(userToSave);
      toast({ title: "Member Updated", description: `${userToSave.name}'s information has been updated.` });
    }
    // Note: In a real app, we would re-fetch users or get the updated list back
    // For this demo, we'll just close the form. The revalidation should update the UI.
    setEditingUser(null);
  };

  const handleDeleteConfirm = async () => {
    if (deletingUser) {
        await deleteUser(deletingUser.id);
        toast({ title: "Member Deleted", description: `${deletingUser.name} has been removed from the community.`, variant: 'destructive' });
        setDeletingUser(null);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setEditingUser('new')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Member
        </Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Birthday</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profilePicture} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{new Date(2024, user.birthday.month - 1, user.birthday.day).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</TableCell>
                <TableCell>
                  {user.isAdmin && <Badge>Admin</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingUser(user)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setDeletingUser(user)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingUser && (
        <MemberForm 
            user={editingUser === 'new' ? null : editingUser} 
            onSave={handleSave}
            onCancel={() => setEditingUser(null)}
        />
      )}

      {deletingUser && (
        <AlertDialog open onOpenChange={() => setDeletingUser(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete {deletingUser.name} from the community. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteConfirm} variant="destructive">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
