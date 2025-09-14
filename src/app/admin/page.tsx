'use client';
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session || session.user.role !== 'ADMIN') {
    return <p>Unauthorized</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Your admin UI goes here */}
    </div>
  );
}
