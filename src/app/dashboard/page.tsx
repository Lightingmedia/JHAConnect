import { communityUsers, communityPosts } from '@/lib/data';
import { getAuthenticatedUser } from '@/lib/auth';
import BirthdayGreeting from '@/components/birthday-greeting';
import StatusUpdate from '@/components/status-update';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, isSameDay } from 'date-fns';
import { Cake, ThumbsUp } from 'lucide-react';
import type { User } from '@/lib/types';

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();

  const today = new Date();
  const birthdaysToday = communityUsers.filter(u => u.birthday.month === today.getMonth() + 1 && u.birthday.day === today.getDate());
  
  const upcomingBirthdays = communityUsers.map(u => {
    const birthdayDate = new Date(today.getFullYear(), u.birthday.month - 1, u.birthday.day);
    if (birthdayDate < today) {
      birthdayDate.setFullYear(today.getFullYear() + 1);
    }
    return { ...u, birthdayDate };
  }).sort((a, b) => a.birthdayDate.getTime() - b.birthdayDate.getTime())
  .slice(0, 5);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-headline">Welcome, {user?.name.split(' ')[0]}!</h1>
        
        {birthdaysToday.map(birthdayUser => (
          <BirthdayGreeting key={birthdayUser.id} member={birthdayUser} />
        ))}

        <StatusUpdate currentUser={user!} />
      </div>

      <div className="space-y-6">
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Cake className="text-primary" />
              Upcoming Birthdays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingBirthdays.map(u => (
                <li key={u.id} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={u.profilePicture} />
                    <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(u.birthdayDate, 'MMMM do')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="font-headline">Community Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={today}
                    className="rounded-md"
                    modifiers={{
                        birthday: communityUsers.map(u => new Date(today.getFullYear(), u.birthday.month - 1, u.birthday.day))
                    }}
                    modifiersStyles={{
                        birthday: {
                            color: 'hsl(var(--primary-foreground))',
                            backgroundColor: 'hsl(var(--primary))'
                        }
                    }}
                />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
