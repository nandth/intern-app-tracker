import React from 'react';
import { formatDateForDisplay, getStatusColor } from '../utils/formatters';

const ApplicationTable = ({ applications, onEdit, onDelete, onView }) => {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No applications found. Create your first application!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Applied
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{app.company}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{app.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{app.location || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDateForDisplay(app.date_applied)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onView(app)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(app)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(app)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {applications.map((app) => (
          <div key={app.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{app.company}</h3>
                <p className="text-sm text-gray-600">{app.role}</p>
              </div>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-3">
              <p>{app.location || 'Location not specified'}</p>
              <p>Applied: {formatDateForDisplay(app.date_applied)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onView(app)}
                className="flex-1 px-3 py-2 border border-blue-600 text-blue-600 rounded-md text-sm hover:bg-blue-50"
              >
                View
              </button>
              <button
                onClick={() => onEdit(app)}
                className="flex-1 px-3 py-2 border border-indigo-600 text-indigo-600 rounded-md text-sm hover:bg-indigo-50"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(app)}
                className="flex-1 px-3 py-2 border border-red-600 text-red-600 rounded-md text-sm hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTable;
