import { communityUsers, communityPosts, members } from '@/lib/data';
import { getAuthenticatedUser } from '@/lib/auth';
import BirthdayGreeting from '@/components/birthday-greeting';
import StatusUpdate from '@/components/status-update';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, isSameDay, parse } from 'date-fns';
import { Cake, ThumbsUp } from 'lucide-react';
import type { User, Member } from '@/lib/types';

function getBirthdayDates(users: (User | {name: string, birthday: {month: number, day: number}})[]): Date[] {
  const today = new Date();
  return users
    .filter(u => u.birthday && typeof u.birthday.month === 'number' && typeof u.birthday.day === 'number')
    .map(u => new Date(today.getFullYear(), u.birthday.month - 1, u.birthday.day));
}

function parseMembers(members: Member[]): User[] {
    const monthMap: { [key: string]: number } = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
        'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    };

    return members.filter(m => m.dob).map((member, index) => {
        const [monthStr, dayStr] = member.dob!.split(' ');
        const month = monthMap[monthStr];
        const day = parseInt(dayStr, 10);
        
        return {
            id: `member-${index}`,
            name: member.name,
            phone: member.phone || '',
            profilePicture: `https://picsum.photos/seed/member${index}/200/200`,
            profileDetails: '',
            birthday: { month, day },
            isAdmin: false
        };
    });
}


export default async function DashboardPage() {
  const user = await getAuthenticatedUser();

  const today = new Date();

  const parsedMembers = parseMembers(members);
  const allUsers = [...communityUsers, ...parsedMembers];
  
  const birthdaysToday = allUsers.filter(u => u.birthday.month === today.getMonth() + 1 && u.birthday.day === today.getDate());
  
  const upcomingBirthdays = allUsers.map(u => {
    // Ensure birthday is valid before creating a date
    if (u.birthday && typeof u.birthday.month === 'number' && typeof u.birthday.day === 'number') {
      const birthdayDate = new Date(today.getFullYear(), u.birthday.month - 1, u.birthday.day);
      if (birthdayDate < today) {
        birthdayDate.setFullYear(today.getFullYear() + 1);
      }
      return { ...u, birthdayDate };
    }
    return { ...u, birthdayDate: null };
  })
  .filter(u => u.birthdayDate) // Filter out users with invalid birthdays
  .sort((a, b) => a.birthdayDate!.getTime() - b.birthdayDate!.getTime())
  .slice(0, 5);

  const birthdayDates = getBirthdayDates(allUsers);


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
                    {u.birthdayDate && (
                      <p className="text-sm text-muted-foreground">
                        {format(u.birthdayDate, 'MMMM do')}
                      </p>
                    )}
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
                        birthday: birthdayDates
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
