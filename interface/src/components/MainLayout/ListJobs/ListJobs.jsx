import { useState, useEffect, Component } from 'react';
import axios from 'axios';
import './styles.css';
import JobCard from './JobCard';
import { toast } from 'react-toastify';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className='d-flex justify-content-center align-items-center mt-4'>
        <button
            className='btn btn-outline-secondary me-3'
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
        >
            <i className='bi bi-chevron-left'></i>
        </button>
        <span>{`${currentPage} / ${totalPages} trang`}</span>
        <button
            className='btn btn-outline-secondary ms-3'
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
        >
            <i className='bi bi-chevron-right'></i>
        </button>
    </div>
);

const ListJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState('Ngẫu Nhiên');
    const jobsPerPage = 12;
    const filters = ['Ngẫu Nhiên', 'Hà Nội', 'TP.HCM', 'Miền Bắc', 'Miền Nam'];

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

    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: document.querySelector('.job-listings').offsetTop - 100,
            behavior: 'smooth',
        });
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        setCurrentPage(1);
    };

    let JobDetailCache = {};
    const prefetchJobDetail = async (id) => {
        if (!JobDetailCache[id]) {
            try {
                const response = await axios.get(
                    `http://localhost:5224/api/JobPosts/get-jobpost/${id}`
                );
                JobDetailCache[id] = response.data;
            } catch (error) {
                console.log('Lỗi tải bài viết', error);
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
                {jobs.map((job) => (
                    <JobCard job={job} jobDetail={prefetchJobDetail(job.id)} />
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
