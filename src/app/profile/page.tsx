import AppLayout from "@/components/app-layout"
import { ProfileForm } from "@/components/profile-form"
import { getAuthenticatedUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AppLayout>
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline">Edit Your Profile</CardTitle>
            <CardDescription>
              Update your personal information and profile picture. Changes are for demonstration and will not persist across sessions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm user={user} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
