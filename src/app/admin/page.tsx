'use client';
import Link from 'next/link';
import { 
  FileText, 
  ShoppingBasket, 
  Users, 
  BarChart, 
  TrendingUp,
  Mail,
  Calendar,
  Plus,
  Eye,
  Edit,
  ArrowRight
} from 'lucide-react';
import AdminLayout from '@/components/Admin/AdminLayout';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  // Mock data - replace with real data from your database
  const stats = {
    blogPosts: 24,
    marketEntries: 126,
    trustedSellers: 9,
    monthlyVisitors: 1240
  };

  const recentPosts = [
    {
      id: 1,
      title: "Sustainable Farming Practices in Nigeria",
      status: "Published",
      date: "Sep 15, 2025",
      views: 245
    },
    {
      id: 2,
      title: "Impact of Climate Change on Crop Yields",
      status: "Draft",
      date: "Sep 12, 2025",
      views: 0
    },
    {
      id: 3,
      title: "AI Applications in Agriculture",
      status: "Published",
      date: "Sep 10, 2025",
      views: 189
    }
  ];

  const recentMessages = [
    {
      id: 1,
      subject: "Research Collaboration Inquiry",
      from: "james.smith@example.com",
      preview: "Hello Dr. Apalowo, I'm interested in collaborating on sustainable farming practices...",
      date: "Sep 15, 2025",
      unread: true
    },
    {
      id: 2,
      subject: "Guest Lecture Request",
      from: "university@edu.ng",
      preview: "We would like to invite you for a guest lecture on nematology...",
      date: "Sep 14, 2025",
      unread: false
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Dr. Apalowo!</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your agricultural science platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Blog Posts</div>
                <div className="text-2xl font-semibold text-gray-900">{stats.blogPosts}</div>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/blog" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Manage posts →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <ShoppingBasket className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Market Entries</div>
                <div className="text-2xl font-semibold text-gray-900">{stats.marketEntries}</div>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/market-watch" className="text-sm text-green-600 hover:text-green-800 font-medium">
                View market data →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Trusted Sellers</div>
                <div className="text-2xl font-semibold text-gray-900">{stats.trustedSellers}</div>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/sellers" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                Manage sellers →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 mr-4">
                <BarChart className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Monthly Visitors</div>
                <div className="text-2xl font-semibold text-gray-900">{stats.monthlyVisitors.toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-amber-600 font-medium">
                +12% from last month
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Blog Posts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-brand-green" />
                  Recent Blog Posts
                </h2>
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin/blog">
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{post.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.views} views</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-brand-green" />
                Site Traffic Overview
              </h2>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-center">
                  <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Traffic analytics will be displayed here</p>
                  <p className="text-sm text-gray-400">Connect your analytics service to view real-time data</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-3">
                <Button asChild className="bg-brand-green hover:bg-brand-green/90 text-white justify-start">
                  <Link href="/admin/blog/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Blog Post
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/admin/market-watch/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Market Update
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/admin/sellers/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Seller
                  </Link>
                </Button>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-brand-green" />
                  Messages
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/messages">View all</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {recentMessages.map((message) => (
                  <div key={message.id} className={`p-3 rounded-lg border transition-colors hover:bg-gray-50 ${
                    message.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">{message.subject}</h3>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{message.preview}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{message.from}</span>
                      <span>{message.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-brand-green" />
                  Upcoming Events
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/events">Manage</Link>
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">
                    Agricultural Technology Conference
                  </h3>
                  <p className="text-xs text-gray-600">September 25, 2025 • Abuja</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">
                    Guest Lecture: Sustainable Farming
                  </h3>
                  <p className="text-xs text-gray-600">October 2, 2025 • Nnamdi Azikiwe University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
