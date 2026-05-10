import { useState } from "react";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

const JobForm = ({ job, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    company_name: job?.company_name || "",
    job_title: job?.job_title || "",
    status: job?.status || "",
    notes: job?.notes || "",
    application_date: job?.application_date || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Company Name
        </label>
        <input
          type="text"
          name="company_name"
          placeholder="e.g. Acme Corp"
          value={formData.company_name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Job Title
        </label>
        <input
          type="text"
          name="job_title"
          placeholder="e.g. Software Engineer"
          value={formData.job_title}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Notes
        </label>
        <input
          type="text"
          name="notes"
          placeholder="Any notes..."
          value={formData.notes}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Application Date
        </label>
        <input
          type="date"
          name="application_date"
          value={formData.application_date}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer"
        >
          {job ? "Save Changes" : "Add Job"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JobForm;
