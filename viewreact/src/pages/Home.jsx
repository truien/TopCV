import React, { useState, useEffect } from 'react';
import { Header, Wellcome } from '~/components';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch(`http://localhost:5224/api/JobPosts?page=${currentPage}&pageSize=12`);
            const data = await response.json();
            setJobs(data.Jobs);
            setTotalPages(data.TotalPages);
        };

        fetchJobs();
    }, [currentPage]);

    return (
        <div>
            <Header />
            <Wellcome />
            <div>
                <div className="grid grid-cols-3 gap-4">
                    {jobs.map((job, index) => (
                        <div key={index} className="job-card">
                            <img src={job.Avatar} alt={job.JobTitle} />
                            <h3>{job.JobTitle}</h3>
                            <p>{job.CompanyName}</p>
                            <p>{job.Salary}</p>
                            <p>{job.Address}</p>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <button key={index} onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
