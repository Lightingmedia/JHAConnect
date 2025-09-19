import AppLayout from '@/components/app-layout';

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
