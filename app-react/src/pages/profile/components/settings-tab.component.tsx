import React from 'react';

interface SettingsTabProps {
  settingsCategory?: string;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ settingsCategory = 'general' }) => {
  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium mb-3">Notifications</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span className="text-sm">Email notifications</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span className="text-sm">Push notifications</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" />
            <span className="text-sm">SMS notifications</span>
          </label>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Language & Region</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="utc">UTC</option>
              <option value="est">EST</option>
              <option value="pst">PST</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium mb-3">Password & Security</h4>
        <div className="space-y-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Change Password
          </button>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-sm">Two-factor authentication</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Login Sessions</h4>
        <div className="space-y-2">
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Current Session</p>
                <p className="text-xs text-gray-500">Chrome on Windows • Active now</p>
              </div>
              <span className="text-xs text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium mb-3">Data & Privacy</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" />
            <span className="text-sm">Allow data collection for analytics</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span className="text-sm">Show profile to other users</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span className="text-sm">Allow search engines to index profile</span>
          </label>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Data Management</h4>
        <div className="space-y-2">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors mr-2">
            Download My Data
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (settingsCategory) {
      case 'security':
        return renderSecuritySettings();
      case 'privacy':
        return renderPrivacySettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <h3 className="text-lg font-semibold mb-4">
        Settings
        {settingsCategory !== 'general' && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            - {settingsCategory.charAt(0).toUpperCase() + settingsCategory.slice(1)}
          </span>
        )}
      </h3>

      {renderContent()}
    </div>
  );
};

export default SettingsTab;
