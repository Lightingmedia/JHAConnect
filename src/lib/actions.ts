'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { communityUsers } from './data';
import { generateBirthdayGreeting } from '@/ai/flows/generate-birthday-greeting';
import type { GenerateBirthdayGreetingInput } from '@/ai/flows/generate-birthday-greeting';

export async function login(formData: FormData): Promise<{ error: string } | void> {
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
