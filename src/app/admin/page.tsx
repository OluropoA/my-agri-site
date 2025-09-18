'use client';
import { useSession } from "next-auth/react";
import { Section } from '@/components/Layout/Layout';

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session || session.user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-ivory/20">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4 font-primary">Unauthorized Access</h2>
          <p className="text-brand-charcoal/70 font-secondary">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Section bgColor="white" className="py-10">
        <h1 className="text-3xl font-bold text-brand-charcoal mb-8 font-primary">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-brand-charcoal mb-4 font-primary">User Management</h2>
            <p className="text-brand-charcoal/70 mb-4 font-secondary">Manage users and permissions</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-brand-charcoal mb-4 font-primary">Content Management</h2>
            <p className="text-brand-charcoal/70 mb-4 font-secondary">Manage blog posts and pages</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-brand-charcoal mb-4 font-primary">Analytics</h2>
            <p className="text-brand-charcoal/70 mb-4 font-secondary">View site statistics and reports</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
