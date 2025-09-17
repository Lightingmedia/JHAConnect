'use server';

import { cookies } from 'next/headers';
import { communityUsers } from '@/lib/data';
import type { User } from '@/lib/types';

export async function getAuthenticatedUser(): Promise<User | null> {
  const cookieStore = cookies();
  const phone = cookieStore.get('auth_phone')?.value;

  if (!phone) {
    return null;
  }

  const user = communityUsers.find((u) => u.phone === phone);
  return user || null;
}
