import React from 'react';
import { formatDateForDisplay, getStatusColor } from '../utils/formatters';

const ApplicationDetails = ({ application, onClose, onEdit }) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 my-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Application Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Company</label>
            <p className="mt-1 text-lg font-semibold">{application.company}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Role</label>
            <p className="mt-1 text-lg">{application.role}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Location</label>
            <p className="mt-1">{application.location || 'Not specified'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Status</label>
            <span
              className={`mt-1 inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                application.status
              )}`}
            >
              {application.status}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Date Applied</label>
            <p className="mt-1">{formatDateForDisplay(application.date_applied)}</p>
          </div>

          {application.link_to_posting && (
            <div>
              <label className="block text-sm font-medium text-gray-500">Job Posting</label>
              <a
                href={application.link_to_posting}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-blue-600 hover:text-blue-800 underline break-all"
              >
                {application.link_to_posting}
              </a>
            </div>
          )}

          {application.notes && (
            <div>
              <label className="block text-sm font-medium text-gray-500">Notes</label>
              <p className="mt-1 whitespace-pre-wrap text-gray-700">{application.notes}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-500">Created</label>
              <p className="mt-1 text-sm">{formatDateForDisplay(application.created_at)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Last Updated</label>
              <p className="mt-1 text-sm">{formatDateForDisplay(application.updated_at)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEdit(application);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
