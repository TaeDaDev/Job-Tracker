import React from "react";

const options = [
  { value: "All", label: "All" },
  { value: "Applied", label: "Applied" },
  { value: "Interviewing", label: "Interviewing" },
  { value: "Rejected", label: "Rejected" },
  { value: "Offer", label: "Offer" },
];

const FilterJobs = ({ filterStatus, onFilterChange }) => {
  return (
    <select
      value={filterStatus}
      onChange={(e) => onFilterChange(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterJobs;
