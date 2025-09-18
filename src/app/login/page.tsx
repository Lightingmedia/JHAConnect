import Image from 'next/image';
import { LoginForm } from '@/components/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
        <CardHeader className="text-center">
          <Image 
            src="https://storage.googleapis.com/aifirebase-static-content/prompts/visual-chat/1722306785246_9135.png"
            alt="JHA Connect Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <CardTitle className="text-3xl font-headline pt-4">JHA Connect</CardTitle>
          <CardDescription>Welcome to our community hub.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
