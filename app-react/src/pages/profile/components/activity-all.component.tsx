import React from 'react';

const ActivityAllComponent: React.FunctionComponent = () => {
  return (
    <div className="activity-all-content p-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-medium text-gray-900">Login Activity</h3>
                  <p className="text-sm text-gray-600">You logged in from Chrome</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">👤</span>
                <div>
                  <h3 className="font-medium text-gray-900">Profile Updated</h3>
                  <p className="text-sm text-gray-600">Changed profile picture</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <h3 className="font-medium text-gray-900">Security Check</h3>
                  <p className="text-sm text-gray-600">Two-factor authentication enabled</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityAllComponent;
