import React, { useState, useEffect } from 'react';
import { formatDateForInput } from '../utils/formatters';

const ApplicationForm = ({ application, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    status: 'Applied',
    dateApplied: '',
    linkToPosting: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (application) {
      setFormData({
        company: application.company || '',
        role: application.role || '',
        location: application.location || '',
        status: application.status || 'Applied',
        dateApplied: formatDateForInput(application.date_applied) || '',
        linkToPosting: application.link_to_posting || '',
        notes: application.notes || '',
      });
    }
  }, [application]);

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.dateApplied) newErrors.dateApplied = 'Date applied is required';
    if (!formData.status) newErrors.status = 'Status is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 my-8">
        <h2 className="text-2xl font-bold mb-6">
          {application ? 'Edit Application' : 'New Application'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full border ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter company name"
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full border ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter job role"
            />
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
            />
          </div>

          {/* Status and Date Applied */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`w-full border ${
                  errors.status ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
            </div>

            <div>
              <label htmlFor="dateApplied" className="block text-sm font-medium text-gray-700 mb-1">
                Date Applied *
              </label>
              <input
                type="date"
                id="dateApplied"
                name="dateApplied"
                value={formData.dateApplied}
                onChange={handleChange}
                className={`w-full border ${
                  errors.dateApplied ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.dateApplied && (
                <p className="text-red-500 text-sm mt-1">{errors.dateApplied}</p>
              )}
            </div>
          </div>

          {/* Link to Posting */}
          <div>
            <label htmlFor="linkToPosting" className="block text-sm font-medium text-gray-700 mb-1">
              Link to Posting
            </label>
            <input
              type="url"
              id="linkToPosting"
              name="linkToPosting"
              value={formData.linkToPosting}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/job-posting"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any additional notes..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {application ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
