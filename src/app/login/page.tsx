import Image from 'next/image';
import { LoginForm } from '@/components/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <Image
        src="https://storage.googleapis.com/aifirebase-demo-images/jhaconnect_background.jpg"
        alt="Community background"
        fill
        className="object-cover -z-10"
        data-ai-hint="community gathering"
      />
      <div className="absolute inset-0 bg-background/50 -z-10" />
      
      <Card className="w-full max-w-sm bg-background/80 backdrop-blur-sm border-2">
        <CardHeader className="text-center items-center">
          <div className="bg-primary rounded-full p-3 mb-2">
            <Users className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-headline pt-2">JHA Connect</CardTitle>
          <CardDescription>Welcome to our community hub.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
