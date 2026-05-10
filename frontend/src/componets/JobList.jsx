import React from "react";

const JobList = ({ jobs, onEdit, onDelete }) => {
  if (!jobs || jobs.length === 0) {
    return <p>No jobs to display.</p>;
  }

  // Get the fields from the first job object
  const columns = [
    "company_name",
    "job_title",
    "status",
    "notes",
    "application_date",
  ];

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>
              {column.replace(/_/g, " ").charAt(0).toUpperCase() +
                column.replace(/_/g, " ").slice(1)}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            {columns.map((column) => (
              <td key={column}>{job[column]}</td>
            ))}
            <td>
              <button onClick={() => onEdit(job)}>Edit</button>
              <button onClick={() => onDelete(job.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobList;
