'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as xlsx from 'xlsx';
import { communityUsers, __dangerously_set_community_users } from './data';
import { generateBirthdayGreeting } from '@/ai/flows/generate-birthday-greeting';
import type { GenerateBirthdayGreetingInput } from '@/ai/flows/generate-birthday-greeting';
import type { User } from './types';
import fs from 'fs/promises';
import path from 'path';
import twilio from 'twilio';
import { getAuthenticatedUser as getAuthUser } from './auth';


export async function getAuthenticatedUser() {
    return getAuthUser();
}

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

export async function sendWhatsAppMessage(to: string, body: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !from) {
        console.error('Twilio credentials are not configured in .env file');
        return { success: false, error: 'WhatsApp integration is not configured.' };
    }

    // Basic phone number formatting
    const formattedTo = `whatsapp:${to.startsWith('+') ? to : `+${to.replace(/\D/g, '')}`}`;

    try {
        const client = twilio(accountSid, authToken);
        await client.messages.create({ from, to: formattedTo, body });
        return { success: true };
    } catch (error) {
        console.error('Twilio Error:', error);
        return { success: false, error: (error as Error).message };
    }
}


export async function updateUser(user: User) {
    const index = communityUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
        communityUsers[index] = user;
        await writeUsersToFile(communityUsers);
        revalidatePath('/admin');
        revalidatePath('/directory');
        revalidatePath('/profile');
        revalidatePath('/dashboard');
    }
}

export async function addUser(user: Omit<User, 'id' | 'profilePicture'>) {
    const newUser: User = {
        ...user,
        id: String(Date.now()),
        profilePicture: `https://picsum.photos/seed/${Date.now()}/200/200`,
    };
    const updatedUsers = [...communityUsers, newUser];
    await writeUsersToFile(updatedUsers);
    revalidatePath('/admin');
    revalidatePath('/directory');
}

export async function deleteUser(userId: string) {
    const updatedUsers = communityUsers.filter(u => u.id !== userId);
    await writeUsersToFile(updatedUsers);
    revalidatePath('/admin');
    revalidatePath('/directory');
}

async function writeUsersToFile(users: User[]) {
    // This is a simplified approach to persist data for the demo.
    // In a real-world application, you would use a database.
    const filePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
    
    // We need to read the existing content to preserve the posts and other exports.
    const existingContent = await fs.readFile(filePath, 'utf-8');
    const postsRegex = /export let communityPosts: Post\[] = (\[[\s\S]*?\]);/;
    const membersRegex = /export const members: Member\[] = (\[[\s\S]*?\]);/;
    const postsMatch = existingContent.match(postsRegex);
    const membersMatch = existingContent.match(membersRegex);

    const postsContent = postsMatch ? postsMatch[0] : 'export let communityPosts: Post[] = [];';
    const membersContent = membersMatch ? membersMatch[0] : 'export const members: Member[] = [];';

    const usersString = JSON.stringify(users, null, 2);

    const newContent = `import type { User, Post, Member } from './types';

// This file will be overwritten by the XLS upload feature.
// Do not edit it manually if you intend to use the upload feature.

export let communityUsers: User[] = ${usersString};

${postsContent}

${membersContent}

// This function is used by the upload action to overwrite the data in this file.
export function __dangerously_set_community_users(users: User[]) {
    communityUsers = users;
}
`;
    await fs.writeFile(filePath, newContent, 'utf-8');
}


export async function uploadUsers(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file uploaded.');
  }

  const buffer = await file.arrayBuffer();
  const workbook = xlsx.read(buffer, { type: 'buffer', cellDates: true });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: any[] = xlsx.utils.sheet_to_json(worksheet);

  const newUsers: User[] = data.map((row: any, index: number) => {
    let birthday = { month: 1, day: 1 };
    if (row.birthday) {
        // Handle Excel's date format
        const date = new Date(row.birthday);
        if (!isNaN(date.getTime())) {
            birthday = {
                month: date.getUTCMonth() + 1,
                day: date.getUTCDate(),
            };
        }
    }
    
    return {
      id: String(row.id || (Date.now() + index)),
      name: row.name || 'No Name',
      phone: String(row.phone || ''),
      profilePicture: row.profilePicture || `https://picsum.photos/seed/${Date.now() + index}/200/200`,
      profileDetails: row.profileDetails || '',
      birthday: birthday,
      isAdmin: String(row.isAdmin).toLowerCase() === 'true',
    };
  });
  
  await writeUsersToFile(newUsers);

  // Re-read the data from the file to update the current server instance
  // This is a workaround for the module caching in Node.js
  const updatedData = await import('./data');
  __dangerously_set_community_users(updatedData.communityUsers);
  
  revalidatePath('/admin', 'layout');
  revalidatePath('/directory');
}
