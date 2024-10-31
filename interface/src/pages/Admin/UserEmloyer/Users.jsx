import { useState, useEffect } from 'react';
import Axios from 'axios';
import logo from '@images/avatar-default.jpg';
import './styles.css';
import { AiOutlineDelete, AiOutlineEyeInvisible } from 'react-icons/ai';
function Users() {
    const [activeCollapse, setActiveCollapse] = useState(null);
    const [jobSeekerData, setJobSeekerData] = useState(null);
    const [EmployerData, setEmployerData] = useState(null);
    const handleCollapse = (collapseId) => {
        setActiveCollapse(activeCollapse === collapseId ? null : collapseId);
    };
    useEffect(() => {
        const fetchData = async () => {
            if (activeCollapse == 'jobSeeker' && !jobSeekerData) {
                try {
                    const response = await Axios.get(
                        'http://localhost:5224/api/Auth/get-all-jobSeeker'
                    );
                    setJobSeekerData(response.data);
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu Nhà tuyển dụng:', error);
                }
            }
            if (activeCollapse == 'employer' && !EmployerData) {
                try {
                    const response = await Axios.get(
                        'http://localhost:5224/api/Auth/get-all-employer'
                    );
                    setEmployerData(response.data);
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu Nhà tuyển dụng:', error);
                }
            }
        };
        fetchData();
    }, [activeCollapse, jobSeekerData, EmployerData]);
    return (
        <>
            <div className='container-custome '>
                <div className='container container-fluid py-2 mb-5 mt-3  '>
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
                                                            <button className='btn btn-danger me-1'>
                                                                <AiOutlineDelete />
                                                            </button>
                                                            <button className='btn btn-warning'>
                                                                < AiOutlineEyeInvisible />
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
                                                        <button className='btn btn-danger me-1'>
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
        </>
    );
}

export default Users;
