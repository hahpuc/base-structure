import React from 'react';

const SettingsGeneralComponent: React.FunctionComponent = () => {
  return (
    <div className="settings-general-content p-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>

          <div className="space-y-6">
            {/* Language Setting */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <h3 className="font-medium text-gray-900">Language</h3>
                  <p className="text-sm text-gray-600">Choose your preferred language</p>
                </div>
              </div>
              <select className="border rounded px-3 py-1">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            {/* Timezone Setting */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🕐</span>
                <div>
                  <h3 className="font-medium text-gray-900">Timezone</h3>
                  <p className="text-sm text-gray-600">Your local timezone</p>
                </div>
              </div>
              <select className="border rounded px-3 py-1">
                <option>UTC-8 (Pacific)</option>
                <option>UTC-5 (Eastern)</option>
                <option>UTC+0 (GMT)</option>
              </select>
            </div>

            {/* Theme Setting */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <h3 className="font-medium text-gray-900">Theme</h3>
                  <p className="text-sm text-gray-600">Light or dark mode</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">Light</button>
                <button className="px-3 py-1 border rounded">Dark</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsGeneralComponent;
