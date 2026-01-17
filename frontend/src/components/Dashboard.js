import React, { useState, useEffect, useCallback } from 'react';
import ApplicationTable from './ApplicationTable';
import ApplicationForm from './ApplicationForm';
import ApplicationDetails from './ApplicationDetails';
import FilterBar from './FilterBar';
import ConfirmDialog from './ConfirmDialog';
import applicationService from '../services/api';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewingApplication, setViewingApplication] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, application: null });

  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('DESC');

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await applicationService.getAll({
        status: statusFilter,
        sortBy: 'date_applied',
        sortOrder: sortOrder,
      });
      setApplications(data);
    } catch (err) {
      setError('Failed to load applications. Please try again.');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, sortOrder]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Handle create/update
  const handleSubmit = async (formData) => {
    try {
      setError(null);
      if (selectedApplication) {
        // Update existing application
        await applicationService.update(selectedApplication.id, formData);
      } else {
        // Create new application
        await applicationService.create(formData);
      }
      setShowForm(false);
      setSelectedApplication(null);
      fetchApplications();
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to save application. Please try again.'
      );
      console.error('Error saving application:', err);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      setError(null);
      await applicationService.delete(deleteConfirm.application.id);
      setDeleteConfirm({ isOpen: false, application: null });
      fetchApplications();
    } catch (err) {
      setError('Failed to delete application. Please try again.');
      console.error('Error deleting application:', err);
    }
  };

  // Open form for new application
  const handleNewApplication = () => {
    setSelectedApplication(null);
    setShowForm(true);
  };

  // Open form for editing
  const handleEdit = (application) => {
    setSelectedApplication(application);
    setShowForm(true);
  };

  // View application details
  const handleView = (application) => {
    setViewingApplication(application);
  };

  // Open delete confirmation
  const handleDeleteClick = (application) => {
    setDeleteConfirm({ isOpen: true, application });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Intern Application Tracker
            </h1>
            <button
              onClick={handleNewApplication}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              + New Application
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
            <button
              onClick={() => setError(null)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          statusFilter={statusFilter}
          sortOrder={sortOrder}
          onStatusChange={setStatusFilter}
          onSortChange={setSortOrder}
        />

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading applications...</p>
          </div>
        ) : (
          <ApplicationTable
            applications={applications}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={handleView}
          />
        )}

        {/* Stats */}
        {!loading && applications.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                <p className="text-sm text-gray-600">Total Applications</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {applications.filter((a) => a.status === 'Applied').length}
                </p>
                <p className="text-sm text-gray-600">Applied</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter((a) => a.status === 'Interview').length}
                </p>
                <p className="text-sm text-gray-600">Interview</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter((a) => a.status === 'Offer').length}
                </p>
                <p className="text-sm text-gray-600">Offers</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Application Form Modal */}
      {showForm && (
        <ApplicationForm
          application={selectedApplication}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedApplication(null);
          }}
        />
      )}

      {/* Application Details Modal */}
      {viewingApplication && (
        <ApplicationDetails
          application={viewingApplication}
          onClose={() => setViewingApplication(null)}
          onEdit={handleEdit}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Application"
        message={`Are you sure you want to delete the application for ${deleteConfirm.application?.role} at ${deleteConfirm.application?.company}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, application: null })}
      />
    </div>
  );
};

export default Dashboard;
