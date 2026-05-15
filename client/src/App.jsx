import JobForm from "./componets/JobForm";
import JobList from "./componets/JobList";
import { useState, useEffect } from "react";
import FilterJobs from "./componets/FilterJobs";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetch(`${apiUrl}/jobs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return response.json();
      })
      .then((data) => setJobs(data))
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  const handleAddJob = (job) => {
    fetch(`${apiUrl}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add job");
      }
      return response.json();
    })
    .then((newJob) => {
      setJobs([...jobs, newJob]);
      setShowForm(false);
    })
    .catch((error) => {
      console.error("Error adding job:", error);
    });
  };

  const handleEditJob = (updatedJob) => {
    fetch(`${apiUrl}/jobs/${selectedJob.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJob),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit job");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(jobs.map((job) => (job.id === data.id ? data : job)));
        setSelectedJob(null);
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error editing job:", error);
      });
  };

  const handleDeleteJob = (id) => {
    fetch(`${apiUrl}/jobs/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => setJobs(jobs.filter((job) => job.id !== id)));
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const filteredJobs =
    filterStatus === "All"
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Job Tracker
        </h1>
        <button
          onClick={() => {
            setSelectedJob(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          + Add Job
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Filter:</span>
          <FilterJobs
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />
          <span className="ml-auto text-sm text-gray-400">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
          </span>
        </div>

        <JobList
          jobs={filteredJobs}
          onEdit={handleEditClick}
          onDelete={handleDeleteJob}
        />
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedJob ? "Edit Job" : "Add New Job"}
              </h2>
            </div>
            <JobForm
              job={selectedJob}
              onSubmit={selectedJob ? handleEditJob : handleAddJob}
              onCancel={() => {
                setShowForm(false);
                setSelectedJob(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
