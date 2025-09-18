import MemberManagement from "@/components/member-management"
import { communityUsers } from "@/lib/data";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline">Admin Panel</h1>
      <p className="text-muted-foreground">
        Manage community members. Changes made here are for demonstration and will not persist.
      </p>
      <MemberManagement users={communityUsers} />
    </div>
  )
}
