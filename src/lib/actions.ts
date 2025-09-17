'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
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
