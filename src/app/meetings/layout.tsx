import AppLayout from '@/components/app-layout';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
