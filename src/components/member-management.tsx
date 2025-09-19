'use client';

import { useState, useEffect } from 'react';
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
import { MoreHorizontal, PlusCircle, Upload, Shield, ShieldCheck, User as UserIcon } from 'lucide-react';
import type { User } from '@/lib/types';
import { MemberForm } from '@/components/member-form';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { addUser, deleteUser, updateUser, uploadUsers, getAuthenticatedUser } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { MemberUpload } from './member-upload';
import { useRouter } from 'next/navigation';

// A simple client-side utility to get the current user.
// In a real app, this would likely come from a context or a hook.
async function getCurrentUser() {
  return await getAuthenticatedUser();
}

const SUPER_ADMIN_PHONE = "9254343862";

export default function MemberManagement({ users }: { users: User[] }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null | 'new'>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then(setCurrentUser);
  }, []);

  const isSuperAdmin = currentUser?.phone === SUPER_ADMIN_PHONE;

  const getRole = (user: User) => {
    if (user.phone === SUPER_ADMIN_PHONE) return 'Super Admin';
    if (user.isAdmin) return 'Admin';
    return 'Member';
  };

  const canEdit = (targetUser: User) => {
    if (!currentUser) return false;
    if (isSuperAdmin) return true; // Super admin can edit anyone
    if (!currentUser.isAdmin) return false; // Non-admins can't edit
    
    // Admins can't edit super admins or other admins
    if (targetUser.phone === SUPER_ADMIN_PHONE || targetUser.isAdmin) {
        return false;
    }
    return true;
  }

  const canDelete = (targetUser: User) => {
    // Admins can't delete the Super Admin.
    if (targetUser.phone === SUPER_ADMIN_PHONE) return false;
    if (!currentUser) return false;
    // Super admin can delete anyone (except themselves).
    if (isSuperAdmin && currentUser.id !== targetUser.id) return true;
    // Admins can delete members, but not other admins.
    if (currentUser.isAdmin && !targetUser.isAdmin) return true;
    
    return false;
  }

  const handleEdit = (user: User) => {
    if (canEdit(user)) {
        setEditingUser(user);
    } else {
        toast({
            title: "Permission Denied",
            description: "You do not have permission to edit this user.",
            variant: "destructive",
        });
    }
  }
  
  const handleDelete = (user: User) => {
    if (canDelete(user)) {
        setDeletingUser(user);
    } else {
        toast({
            title: "Permission Denied",
            description: "You do not have permission to delete this user.",
            variant: "destructive",
        });
    }
  }


  const handleSave = async (userToSave: User) => {
    try {
        if (editingUser === 'new') {
            await addUser(userToSave);
            toast({ title: "Member Added", description: `${userToSave.name} has been added to the community.` });
        } else {
            await updateUser(userToSave);
            toast({ title: "Member Updated", description: `${userToSave.name}'s information has been updated.` });
        }
        setEditingUser(null);
        router.refresh(); // This will re-fetch server components
    } catch (error) {
        toast({ title: "Error", description: "Could not save member.", variant: 'destructive' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingUser) {
        try {
            await deleteUser(deletingUser.id);
            toast({ title: "Member Deleted", description: `${deletingUser.name} has been removed from the community.`, variant: 'destructive' });
            setDeletingUser(null);
            router.refresh();
        } catch(error) {
            toast({ title: "Error", description: "Could not delete member.", variant: 'destructive' });
        }
    }
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadUsers(formData);
      toast({
        title: 'Upload Successful',
        description: 'Member data has been updated from the XLS file.',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: (error as Error).message || 'An unknown error occurred.',
        variant: 'destructive',
      });
    }
    setIsUploading(false);
  };


  return (
    <>
      <div className="flex justify-end gap-2">
        <Button onClick={() => setIsUploading(true)} disabled={!isSuperAdmin}>
            <Upload className="mr-2 h-4 w-4" />
            Upload XLS
        </Button>
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
            {users.map((user) => {
                const role = getRole(user);
                const isTargetSuperAdmin = user.phone === SUPER_ADMIN_PHONE;

                return (
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
                    <Badge variant={role === 'Super Admin' ? 'destructive' : role === 'Admin' ? 'default' : 'secondary'}>
                        {role === 'Super Admin' && <ShieldCheck className="mr-2 h-4 w-4" />}
                        {role === 'Admin' && <Shield className="mr-2 h-4 w-4" />}
                        {role === 'Member' && <UserIcon className="mr-2 h-4 w-4" />}
                        {role}
                    </Badge>
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
                      <DropdownMenuItem onClick={() => handleEdit(user)} disabled={!canEdit(user)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDelete(user)}
                        disabled={!canDelete(user)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </div>

      {editingUser && (
        <MemberForm 
            user={editingUser === 'new' ? null : editingUser} 
            onSave={handleSave}
            onCancel={() => setEditingUser(null)}
            currentUser={currentUser}
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

      {isUploading && (
        <MemberUpload onUpload={handleFileUpload} onCancel={() => setIsUploading(false)} />
      )}
    </>
  );
}
