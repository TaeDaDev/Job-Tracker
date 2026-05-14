import React from "react";

const statusStyles = {
  Applied: "bg-blue-100 text-blue-700",
  Interviewing: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
  Offer: "bg-green-100 text-green-700",
};

const columns = [
  "company_name",
  "job_title",
  "status",
  "notes",
  "application_date",
];

const formatHeader = (col) =>
  col.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

const JobList = ({ jobs, onEdit, onDelete }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No jobs yet. Add one to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 font-semibold text-gray-600 uppercase tracking-wide text-xs"
              >
                {formatHeader(col)}
              </th>
            ))}
            <th className="px-4 py-3 font-semibold text-gray-600 uppercase tracking-wide text-xs">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col} className="px-4 py-3 text-gray-700">
                  {col === "status" ? (
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusStyles[job[col]] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {job[col]}
                    </span>
                  ) : col === "application_date" ? (
                    job[col]?.slice(0, 10) || ""
                  ) : (
                    job[col]
                  )}
                </td>
              ))}
              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => onEdit(job)}
                  className="text-indigo-600 hover:text-indigo-800 text-xs font-medium px-3 py-1 rounded-md border border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(job.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-medium px-3 py-1 rounded-md border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
