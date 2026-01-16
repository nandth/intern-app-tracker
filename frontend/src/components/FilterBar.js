import React from 'react';

const FilterBar = ({ statusFilter, sortOrder, onStatusChange, onSortChange }) => {
  const statuses = ['All', 'Applied', 'Interview', 'Rejected', 'Offer'];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status === 'All' ? '' : status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-order" className="text-sm font-medium text-gray-700">
            Sort by Date:
          </label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DESC">Newest First</option>
            <option value="ASC">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
