'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as xlsx from 'xlsx';
import { communityUsers } from './data';
import { generateBirthdayGreeting } from '@/ai/flows/generate-birthday-greeting';
import type { GenerateBirthdayGreetingInput } from '@/ai/flows/generate-birthday-greeting';
import type { User } from './types';

export async function login(
  prevState: { error: string } | undefined,
  formData: FormData
): Promise<{ error: string } | void> {
  const phone = formData.get('phone') as string;

  const user = communityUsers.find((u) => u.phone === phone);

  if (user) {
    const cookieStore = cookies();
    cookieStore.set('auth_phone', phone, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
    redirect('/dashboard');
  } else {
    return { error: 'Invalid phone number. Access denied.' };
  }
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete('auth_phone');
  redirect('/login');
}

export async function getAIBirthdayGreeting(input: GenerateBirthdayGreetingInput) {
    const result = await generateBirthdayGreeting(input);
    return result.greeting;
}

export async function updateUser(user: User) {
    const index = communityUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
        communityUsers[index] = user;
        revalidatePath('/admin');
        revalidatePath('/directory');
        revalidatePath('/profile');
    }
}

export async function addUser(user: Omit<User, 'id'>) {
    const newUser: User = {
        ...user,
        id: String(Date.now()),
        profilePicture: `https://picsum.photos/seed/${Date.now()}/200/200`,
    };
    communityUsers.push(newUser);
    revalidatePath('/admin');
    revalidatePath('/directory');
}

export async function deleteUser(userId: string) {
    const index = communityUsers.findIndex(u => u.id === userId);
    if (index !== -1) {
        communityUsers.splice(index, 1);
        revalidatePath('/admin');
        revalidatePath('/directory');
    }
}

export async function uploadUsers(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file uploaded.');
  }

  const buffer = await file.arrayBuffer();
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: any[] = xlsx.utils.sheet_to_json(worksheet);

  // Clear existing users and replace with uploaded data
  // In a real app you'd want more robust merging logic
  communityUsers.length = 0; 

  data.forEach((row: any, index: number) => {
    const birthday = row.birthday ? new Date(row.birthday) : new Date();
    const newUser: User = {
      id: row.id || String(Date.now() + index),
      name: row.name || 'No Name',
      phone: String(row.phone || ''),
      profilePicture: row.profilePicture || `https://picsum.photos/seed/${Date.now() + index}/200/200`,
      profileDetails: row.profileDetails || '',
      birthday: {
        month: birthday.getMonth() + 1,
        day: birthday.getDate(),
      },
      isAdmin: row.isAdmin === 'true' || row.isAdmin === true,
    };
    communityUsers.push(newUser);
  });

  revalidatePath('/admin');
  revalidatePath('/directory');
}
