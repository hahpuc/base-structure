import React from 'react';

const ActivityLoginComponent: React.FunctionComponent = () => {
  return (
    <div className="activity-login-content">
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Login Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔐</span>
              <div>
                <h3 className="font-medium text-gray-900">Successful Login</h3>
                <p className="text-sm text-gray-600">Chrome on Windows - IP: 192.168.1.100</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔐</span>
              <div>
                <h3 className="font-medium text-gray-900">Successful Login</h3>
                <p className="text-sm text-gray-600">Safari on iPhone - IP: 10.0.0.25</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">❌</span>
              <div>
                <h3 className="font-medium text-gray-900">Failed Login Attempt</h3>
                <p className="text-sm text-gray-600">Unknown device - IP: 203.0.113.0</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLoginComponent;
