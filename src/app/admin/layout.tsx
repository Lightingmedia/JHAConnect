import { redirect } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import { getAuthenticatedUser } from '@/lib/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    // If no user is authenticated, redirect to login.
    redirect('/login');
  }

  if (!user.isAdmin) {
    // If the user is not an admin, show an access denied message.
    return (
        <AppLayout>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription>
                You do not have permission to view this page.
              </AlertDescription>
            </Alert>
        </AppLayout>
    );
  }
  
  // If the user is an admin, render the layout and its children.
  return <AppLayout>{children}</AppLayout>;
}
