'use client';

import { useState } from 'react';
import { 
  Settings,
  Bell,
  Shield,
  Database,
  Palette,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/Admin/AdminLayout';

export default function SettingsAdminPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Dr. Oluropo Apalowo',
    siteDescription: 'Agricultural Science Resources and Research',
    contactEmail: 'oluropo.apalowo@unizik.edu.ng',
    phoneNumber: '+234 803 123 4567',
    address: 'Nnamdi Azikiwe University, Awka, Nigeria',
    
    // Notification Settings
    emailNotifications: true,
    marketAlerts: true,
    newSellerNotifications: true,
    blogCommentNotifications: false,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    
    // Display Settings
    theme: 'light',
    language: 'en',
    timezone: 'Africa/Lagos',
    dateFormat: 'DD/MM/YYYY',
    
    // Content Settings
    blogModeration: true,
    autoPublish: false,
    maxFileSize: 10,
    allowedFileTypes: 'jpg,png,pdf,doc,docx'
  });

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'display', name: 'Display', icon: Palette },
    { id: 'content', name: 'Content', icon: Database }
  ];

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving settings:', settings);
    // Show success message
    alert('Settings saved successfully!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Site Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={settings.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Description
          </label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) => handleInputChange('siteDescription', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'General Email Notifications', description: 'Receive general system notifications via email' },
            { key: 'marketAlerts', label: 'Market Price Alerts', description: 'Get notified when market prices change significantly' },
            { key: 'newSellerNotifications', label: 'New Seller Applications', description: 'Receive notifications for new seller registrations' },
            { key: 'blogCommentNotifications', label: 'Blog Comments', description: 'Get notified when someone comments on blog posts' }
          ].map((item) => (
            <div key={item.key} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={settings[item.key as keyof typeof settings] as boolean}
                  onChange={(e) => handleInputChange(item.key, e.target.checked)}
                  className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700">
                  {item.label}
                </label>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication & Security</h3>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label className="text-sm font-medium text-gray-700">
                Two-Factor Authentication
              </label>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <select
              value={settings.sessionTimeout}
              onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={480}>8 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="flex">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={settings.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                readOnly
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">Used for API integrations and external services</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDisplaySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Display Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="ig">Igbo</option>
              <option value="yo">Yoruba</option>
              <option value="ha">Hausa</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              <option value="Africa/Lagos">West Africa Time (WAT)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="Europe/London">Greenwich Mean Time</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Format
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleInputChange('dateFormat', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Content Management</h3>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={settings.blogModeration}
                onChange={(e) => handleInputChange('blogModeration', e.target.checked)}
                className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label className="text-sm font-medium text-gray-700">
                Blog Comment Moderation
              </label>
              <p className="text-sm text-gray-500">Require approval before comments are published</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={settings.autoPublish}
                onChange={(e) => handleInputChange('autoPublish', e.target.checked)}
                className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label className="text-sm font-medium text-gray-700">
                Auto-publish Blog Posts
              </label>
              <p className="text-sm text-gray-500">Automatically publish scheduled blog posts</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum File Upload Size (MB)
            </label>
            <input
              type="number"
              value={settings.maxFileSize}
              onChange={(e) => handleInputChange('maxFileSize', parseInt(e.target.value))}
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowed File Types
            </label>
            <input
              type="text"
              value={settings.allowedFileTypes}
              onChange={(e) => handleInputChange('allowedFileTypes', e.target.value)}
              placeholder="jpg,png,pdf,doc,docx"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">Comma-separated list of allowed file extensions</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'display':
        return renderDisplaySettings();
      case 'content':
        return renderContentSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your site configuration and preferences</p>
          </div>
          <Button onClick={handleSave} className="bg-brand-green hover:bg-brand-green/90 text-white">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200">
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-brand-green text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
