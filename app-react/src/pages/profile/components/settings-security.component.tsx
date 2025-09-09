import React from 'react';

const SettingsSecurityComponent: React.FunctionComponent = () => {
  return (
    <div className="settings-security-content">
      <div className="bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>

        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 border rounded-lg border-gray-200 hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-600">Enabled</span>
              <button className="px-3 py-1 border rounded text-sm">Configure</button>
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center justify-between p-4 border rounded-lg border-gray-200 hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔑</span>
              <div>
                <h3 className="font-medium text-gray-900">Password</h3>
                <p className="text-sm text-gray-600">Last changed 30 days ago</p>
              </div>
            </div>
            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Change</button>
          </div>

          {/* Login Sessions */}
          <div className="flex items-center justify-between p-4 border rounded-lg border-gray-200 hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-medium text-gray-900">Active Sessions</h3>
                <p className="text-sm text-gray-600">3 active sessions</p>
              </div>
            </div>
            <button className="px-3 py-1 border rounded text-sm">Manage</button>
          </div>

          {/* Backup Codes */}
          <div className="flex items-center justify-between p-4 border rounded-lg border-gray-200 hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔢</span>
              <div>
                <h3 className="font-medium text-gray-900">Backup Codes</h3>
                <p className="text-sm text-gray-600">Recovery codes for account access</p>
              </div>
            </div>
            <button className="px-3 py-1 border rounded text-sm">Generate</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSecurityComponent;
