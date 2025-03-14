import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import JobCard from './JobCard';
import { toast } from 'react-toastify';

const ListJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState('Ngẫu Nhiên');
    const jobsPerPage = 12;
    const filters = ['Ngẫu Nhiên', 'Hà Nội', 'TP.HCM', 'Miền Bắc', 'Miền Nam'];

    const JobDetailCache = {};
    const handleFilterChange = (filter) => {
        console.log('filter', filter);
    };
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5224/api/JobPosts',
                    {
                        params: {
                            page: currentPage,
                            pageSize: jobsPerPage,
                            location:
                                selectedFilter !== 'Ngẫu Nhiên'
                                    ? selectedFilter
                                    : undefined,
                        },
                    }
                );
                setJobs(response.data.jobs);
                setTotalJobs(response.data.total);
            } catch (err) {
                toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau');
                console.log('Lỗi', err);
            }
        };

        fetchJobs();
    }, [currentPage, selectedFilter]);

    const prefetchJobDetail = async (id) => {
        if (!JobDetailCache[id]) {
            try {
                const response = await axios.get(
                    `http://localhost:5224/api/JobPosts/get-jobpost/${id}`
                );
                JobDetailCache[id] = response.data;
            } catch (error) {
                console.error('Lỗi tải bài viết:', error);
            }
        }
    };

    return (
        <div className='container mt-4'>
            <h2 className='mb-4'>Việc làm tốt nhất</h2>
            <div className='mb-3 d-flex flex-wrap gap-2'>
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`btn ${
                            filter === selectedFilter
                                ? 'btn-success'
                                : 'btn-outline-secondary'
                        }`}
                        onClick={() => handleFilterChange(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <div className='row job-listings'>
                {jobs.map((job, index) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        fetchJobDetail={prefetchJobDetail}
                        JobDetailCache={JobDetailCache}
                        index={index}
                    />
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

export default ListJobs;
