import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const JobCard = ({ job }) => (
  <div className="col-md-3 mb-4">
    <div className="card job-card shadow-sm">
      <div className="card-body d-flex">
        <div className="company-logo me-3">
          <img
            src={job.avatar || '/assets/images/topcv-logo-10-year.png'}
            alt="Company Logo"
            style={{ width: '70px', height: '70px', objectFit: 'contain' }}
          />
        </div>
        <div className="job-info flex-grow-1" style={{ maxWidth: 'calc(100% - 80px)', overflow: 'hidden' }}>
          <h5 className="job-title text-truncate fs-5 fw-semibold" style={{ lineHeight: '20px' }}>
            {job.jobTitle}
          </h5>
          <p className="company-name text-truncate fs-6 fw-medium" style={{ height: '23px', lineHeight: '16px' }}>
            {job.company}
          </p>
          <div className="d-flex align-items-end">
            <span className="job-salary text-muted me-3" style={{ fontSize: '12px' }}>
              {job.salary}
            </span>
            <span className="job-location text-muted" style={{ fontSize: '12px' }}>
              {job.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="d-flex justify-content-center align-items-center mt-4">
    <button
      className="btn btn-outline-secondary me-3"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
    <span>{`${currentPage} / ${totalPages} trang`}</span>
    <button
      className="btn btn-outline-secondary ms-3"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  </div>
);

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("Ngẫu Nhiên"); 
  const jobsPerPage = 12;

  const filters = ["Ngẫu Nhiên", "Hà Nội", "TP.HCM", "Miền Bắc", "Miền Nam"];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5224/api/JobPosts`, {
          params: {
            page: currentPage,
            pageSize: jobsPerPage,
            location: selectedFilter !== "Ngẫu Nhiên" ? selectedFilter : undefined
          }
        });
        setJobs(response.data.jobs);
        setTotalJobs(response.data.total);
      } catch (err) {
        console.log("Lỗi", err);
      }
    };

    fetchJobs();
  }, [currentPage, selectedFilter]);

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.querySelector('.job-listings').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); 
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Việc làm tốt nhất</h2>
      <div className="mb-3 d-flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`btn ${filter === selectedFilter ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="row job-listings">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {totalJobs > jobsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default App;
