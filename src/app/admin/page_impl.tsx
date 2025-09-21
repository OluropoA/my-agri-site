import { Metadata } from 'next';
import Link from 'next/link';
import { 
  FileText, 
  ShoppingBasket, 
  Users, 
  BarChart, 
  TrendingUp,
  Mail,
  Calendar
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Dr. Oluropo Apalowo',
  description: 'Admin dashboard for managing blog posts, market watch data, and trusted sellers'
};

// Dashboard component for admin
export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Blog Posts */}
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Blog Posts</div>
              <div className="text-2xl font-semibold text-gray-900">24</div>
            </div>
          </div>
        </div>
        
        {/* Market Watch Entries */}
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <ShoppingBasket className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Market Watch Entries</div>
              <div className="text-2xl font-semibold text-gray-900">126</div>
            </div>
          </div>
        </div>
        
        {/* Trusted Sellers */}
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Trusted Sellers</div>
              <div className="text-2xl font-semibold text-gray-900">9</div>
            </div>
          </div>
        </div>
        
        {/* Site Visitors */}
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-amber-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 mr-4">
              <BarChart className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Monthly Visitors</div>
              <div className="text-2xl font-semibold text-gray-900">1,240</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Traffic Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-[#2D5016]" />
              Site Traffic
            </h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-gray-500">Traffic chart visualization would appear here</p>
            </div>
          </div>
          
          {/* Recent Blog Posts */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#2D5016]" />
                Recent Blog Posts
              </h2>
              <Link 
                href="/admin/blog" 
                className="text-sm text-[#2D5016] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((post) => (
                <div 
                  key={post}
                  className="p-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Impact of Climate Change on Crop Yields
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Published on Sep 5, 2025
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Published
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Recent Messages */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#2D5016]" />
                Recent Messages
              </h2>
              <Link 
                href="/admin/messages" 
                className="text-sm text-[#2D5016] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {[1, 2].map((message) => (
                <div 
                  key={message}
                  className="p-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-100"
                >
                  <h3 className="text-sm font-medium text-gray-900">
                    Research Collaboration Inquiry
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    Hello Dr. Apalowo, I&apos;m interested in collaborating on sustainable farming practices...
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      From: james.smith@example.com
                    </span>
                    <span className="text-xs text-gray-500">
                      Sep 15, 2025
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#2D5016]" />
                Upcoming Events
              </h2>
              <Link 
                href="/admin/events" 
                className="text-sm text-[#2D5016] hover:underline"
              >
                Manage
              </Link>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-sm font-medium text-gray-900">
                  Agricultural Technology Conference
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  September 25, 2025 • Abuja
                </p>
              </div>
              <div className="p-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-sm font-medium text-gray-900">
                  Guest Lecture: Sustainable Farming
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  October 2, 2025 • Nnamdi Azikiwe University
                </p>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/admin/blog/new"
                className="bg-[#2D5016] text-white p-3 rounded-lg text-center text-sm hover:bg-[#2D5016]/90 transition-colors"
              >
                New Blog Post
              </Link>
              <Link 
                href="/admin/market-watch/new"
                className="bg-[#2D5016] text-white p-3 rounded-lg text-center text-sm hover:bg-[#2D5016]/90 transition-colors"
              >
                Market Update
              </Link>
              <Link 
                href="/admin/sellers/new"
                className="bg-[#2D5016] text-white p-3 rounded-lg text-center text-sm hover:bg-[#2D5016]/90 transition-colors"
              >
                Add Seller
              </Link>
              <Link 
                href="/admin/settings"
                className="bg-gray-100 text-gray-800 p-3 rounded-lg text-center text-sm hover:bg-gray-200 transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
