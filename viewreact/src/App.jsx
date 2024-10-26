import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, Wellcome } from './components';
import { FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa'; 
import './styles/App.css';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5224/api/JobPosts?page=${currentPage}&pageSize=12`);
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [currentPage]);

  return (
    <div>
      <Header />
      <Wellcome />
      <div className="container mt-4">
        <h2 className="mb-4">Việc làm mới nhất</h2>
        <div className="row">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="col-md-6 mb-4">
                <div className="card job-card">
                  <div className="card-body d-flex">
                    <div className="company-logo me-3">
                      <img
                        src={job.avatar || '/assets/images/topcv-logo-10-year.png'}
                        alt={job.company}
                        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="job-info">
                      <h5 className="card-title">{job.jobTitle}</h5>
                      <h6 className="company-name">{job.company}</h6>
                      <div className="job-details">
                        <span className="me-3">
                          <FaMapMarkerAlt className="me-1" />
                          {job.location}
                        </span>
                        <span className="me-3">
                          <FaDollarSign className="me-1" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)} className="btn btn-primary me-2">
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
