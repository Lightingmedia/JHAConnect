'use client';

import { useState } from 'react';
import { communityUsers, communityPosts, members } from '@/lib/data';
import type { User, Member } from '@/lib/types';
import { getAuthenticatedUser } from '@/lib/auth';
import BirthdayGreeting from '@/components/birthday-greeting';
import StatusUpdate from '@/components/status-update';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, isSameDay } from 'date-fns';
import { Cake } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"


// Note: Since this is now a client component, we can't use `await` at the top level.
// We would typically fetch the user in a useEffect hook or use a client-side data fetching library.
// For this demo, we will assume the user prop is passed down or fetched in a child server component if needed.
// However, StatusUpdate and BirthdayGreeting expect a user. We'll simulate the logged-in user.
// In a real app, this would be handled by a proper auth context.
const SIMULATED_USER_ID = "user-1719525652"; // Bola Olatunji (Admin)

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


export default function DashboardPage() {
  // We need to make this a client component to handle calendar clicks.
  // For the demo, let's find a simulated user to pass to child components.
  const user = communityUsers.find(u => u.id === SIMULATED_USER_ID);
  
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [birthdaysOnSelectedDay, setBirthdaysOnSelectedDay] = useState<User[]>([]);

  const parsedMembers = parseMembers(members);
  const allUsers = [...communityUsers, ...parsedMembers];
  
  const birthdaysToday = allUsers.filter(u => u.birthday && u.birthday.month === today.getMonth() + 1 && u.birthday.day === today.getDate());
  
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

  const handleDayClick = (day: Date | undefined) => {
    setSelectedDate(day);
    if (day) {
      const birthdays = allUsers.filter(u => 
        u.birthday && 
        u.birthday.month === day.getMonth() + 1 && 
        u.birthday.day === day.getDate()
      );
      if(birthdays.length > 0) {
          setBirthdaysOnSelectedDay(birthdays);
      } else {
          setBirthdaysOnSelectedDay([]);
      }
    } else {
      setBirthdaysOnSelectedDay([]);
    }
  };

  const closeBirthdayDialog = () => {
    setBirthdaysOnSelectedDay([]);
  }

  if (!user) {
      return <div>Loading...</div>; // Or some other loading state
  }


  return (
    <>
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
              <CardTitle className="font-headline flex items-center gap-2 text-xl">
                <Cake className="text-primary" /> Upcoming Birthdays
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
                      selected={selectedDate}
                      onSelect={handleDayClick}
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
      
      {birthdaysOnSelectedDay.length > 0 && (
         <AlertDialog open onOpenChange={closeBirthdayDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-headline">
                        Birthdays on {selectedDate ? format(selectedDate, 'MMMM do') : ''}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                       The following members are celebrating their birthday on this day.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="max-h-60 overflow-y-auto py-4">
                    <ul className="space-y-4">
                        {birthdaysOnSelectedDay.map(u => (
                            <li key={u.id} className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={u.profilePicture} />
                                    <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="font-semibold">{u.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
