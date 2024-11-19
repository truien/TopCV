import { useState, useEffect } from 'react';
import Axios from 'axios';
import logo from '@images/avatar-default.jpg';
import './styles.css';
import ConfirmModal from '@components/ConfirmModal/ConfirmModal.jsx';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
function Users() {
    const [activeCollapse, setActiveCollapse] = useState(null);
    const [jobSeekerData, setJobSeekerData] = useState(null);
    const [EmployerData, setEmployerData] = useState(null);

    const [isModalOpenSeekerJob, setIsModalOpenSeekerJob] = useState(false);  
    const [isModalOpenEmployer, setIsModalOpenEmployer] = useState(false);  
    const [userNameSeekerJob, setUserNameSeekerJob] = useState(null);
    const [userNameEmployer, setUserNameEmployer] = useState(null);
    
    const openDeleteSeekerJob = (userName) => {
        document.getElementById("root").setAttribute("inert", "true");
        setUserNameSeekerJob(userName);
        setIsModalOpenSeekerJob(true);
    };
    const openDeleteEmployer = (userName) => {
        document.getElementById("root").setAttribute("inert", "true");
        setUserNameEmployer(userName);
        setIsModalOpenEmployer(true);
    };
    const closeDeleteModal = () => {
        document.getElementById("root").removeAttribute("inert");
        setIsModalOpenSeekerJob(false);
        setIsModalOpenEmployer(false);
        setUserNameEmployer(null);
        setUserNameSeekerJob(null);
    };

    const handleCollapse = (collapseId) => {
        setActiveCollapse(activeCollapse === collapseId ? null : collapseId);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (activeCollapse == 'jobSeeker' && !jobSeekerData) {
                try {
                    const response = await Axios.get(
                        'http://localhost:5224/api/JobSeeker/get-all-jobSeeker'
                    );
                    setJobSeekerData(response.data);
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu Nhà tuyển dụng:', error);
                }
            }
            if (activeCollapse == 'employer' && !EmployerData) {
                try {
                    const response = await Axios.get(
                        'http://localhost:5224/api/Employer/get-all-employer'
                    );
                    setEmployerData(response.data);
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu Nhà tuyển dụng:', error);
                }
            }
        };
        fetchData();
    }, [activeCollapse, jobSeekerData, EmployerData]);

    const handleDeleteJobSeeker = async () => {
        try {
            await Axios.delete(
                `http://localhost:5224/api/JobSeeker/delete/${userNameSeekerJob}`
            );
            setJobSeekerData((prevData) =>
                prevData.filter((jobSeeker) => jobSeeker.userName !== userNameSeekerJob)
            );
            closeDeleteModal();
        } catch (e) {
            console.warn(e);
            alert('Xóa tài khoản không thành công');
        }
    };
    const handleDeleteEmployer = async () => {
        try {
            await Axios.delete(
                `http://localhost:5224/api/Employer/delete/${userNameEmployer}`
            );
            setEmployerData((prevData) =>
                prevData.filter((employer) => employer.userName !== userNameEmployer)
            );
            closeDeleteModal();
        } catch (e) {
            console.warn(e);
            alert('Xóa tài khoản không thành công');
        }
    };
    return (
        <>
            <div className='container-custome '>
                <div className='container manager container-fluid py-2 mb-5 mt-3  '>
                    <h1 className='text-custom fs-1'>Quản lý tài khoản</h1>
                </div>
                <p>
                    <button
                        className='btn btn-outline-custom me-5'
                        onClick={() => handleCollapse('jobSeeker')}
                    >
                        Người tìm việc
                    </button>
                    <button
                        className='btn btn-outline-custom'
                        onClick={() => handleCollapse('employer')}
                    >
                        Nhà tuyển dụng
                    </button>
                </p>
                <div className='row'>
                    <div className='col'>
                        {activeCollapse === 'jobSeeker' &&
                        jobSeekerData &&
                        jobSeekerData.length > 0 ? (
                            <div className='card card-body'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Username</th>
                                            <th scope='col'>Logo</th>
                                            <th scope='col'>Họ và tên</th>
                                            <th scope='col'>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobSeekerData.map(
                                            (jobSeeker, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {jobSeeker.userName}
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={
                                                                jobSeeker.avatar ||
                                                                logo
                                                            }
                                                            alt='Logo'
                                                            width='50'
                                                            height='50'
                                                        />
                                                    </td>
                                                    <td>
                                                        {jobSeeker.fullName}
                                                    </td>
                                                    <td>{jobSeeker.email}</td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <button
                                                                onClick={() =>
                                                                    openDeleteSeekerJob(
                                                                        jobSeeker.id
                                                                    )
                                                                }
                                                                className='btn btn-danger me-1'
                                                            >
                                                                <AiOutlineDelete />
                                                            </button>
                                                            <button className='btn btn-warning'>
                                                                <AiOutlineEdit />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            activeCollapse === 'jobSeeker' && (
                                <p>Không có dữ liệu Nhà tuyển dụng.</p>
                            )
                        )}
                        {activeCollapse === 'employer' &&
                        EmployerData &&
                        EmployerData.length > 0 ? (
                            <div className='card card-body'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Username</th>
                                            <th scope='col'>Logo</th>
                                            <th scope='col'>Tên công ty</th>
                                            <th scope='col'>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {EmployerData.map((employer, index) => (
                                            <tr key={index}>
                                                <td>{employer.userName}</td>
                                                <td>
                                                    <img
                                                        src={
                                                            employer.avatar ||
                                                            logo
                                                        }
                                                        alt='Logo'
                                                        width='50'
                                                        height='50'
                                                    />
                                                </td>
                                                <td>{employer.companyName}</td>
                                                <td>{employer.email}</td>
                                                <td>
                                                    <div className='d-flex'>
                                                        <button
                                                            className='btn btn-danger me-1'
                                                            onClick={() =>
                                                                openDeleteEmployer(
                                                                    employer.id
                                                                )
                                                            }
                                                        >
                                                            <AiOutlineDelete />
                                                        </button>
                                                        <button className='btn btn-warning'>
                                                            <AiOutlineEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            activeCollapse === 'employer' && (
                                <p>Không có dữ liệu Nhà tuyển dụng.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={isModalOpenEmployer}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteEmployer}
                message='Bạn có chắc chắn muốn xoá tài khoản này?'
            />
            <ConfirmModal
                isOpen={isModalOpenSeekerJob}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteJobSeeker}
                message='Bạn có chắc chắn muốn xoá tài khoản này?'
            />
        </>
    );
}

export default Users;
