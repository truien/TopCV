import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ManageJobPosts.module.css';
import {
    AiOutlineDelete,
    AiOutlineEyeInvisible,
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
} from 'react-icons/ai';

function ManageJobPosts() {
    const [jobPosts, setJobPosts] = useState([]);
    const [unapprovedPosts, setUnapprovedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        fetchUnapprovedPosts();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'http://localhost:5224/api/JobPosts/get-all-jobpost'
            );
            setJobPosts(response.data);
        } catch (error) {
            console.log('Đã xảy ra lỗi', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUnapprovedPosts = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5224/api/JobPosts/get-all-jobpost?status=3'
            );
            setUnapprovedPosts(response.data);
        } catch (error) {
            console.log('Đã xảy ra lỗi khi tải bài chưa phê duyệt', error);
        }
    };

    const handleDelete = async (postId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
            try {
                await axios.delete(
                    `http://localhost:5224/api/JobPosts/delete-jobpost/${postId}`
                );
                setJobPosts((prevPosts) =>
                    prevPosts.filter((post) => post.id !== postId)
                );
                setUnapprovedPosts((prevPosts) =>
                    prevPosts.filter((post) => post.id !== postId)
                );
            } catch (error) {
                console.log('Đã xảy ra lỗi khi xóa bài đăng', error);
            }
        }
    };
    const handleApprove = async (postId) => {
        if (window.confirm('Bạn muốn phê duyệt bài đăng này?')) {
            try {
                await axios.put(
                    `http://localhost:5224/api/JobPosts/update-jobpost-status/${postId}`,
                    1,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setUnapprovedPosts((prevPosts) => 
                    prevPosts.filter((post) => post.id !== postId)
                );
                fetchData();
            } catch (error) {
                console.log('Đã xảy ra lỗi khi phê duyệt bài đăng', error);
            }
        }
    };

    return (
        <>
            <h1 className={styles['title'] + ' mb-5 mt-3'}>Quản lý bài đăng</h1>
            <p>
                <a
                    className={styles['btn-custom'] + ' btn me-5'}
                    data-bs-toggle='collapse'
                    href='#postJobList'
                    role='button'
                    aria-expanded='false'
                    aria-controls='postJobList'
                >
                    Bài đăng
                </a>
                <button
                    className={styles['btn-custom'] + ' btn'}
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#approveJob'
                    aria-expanded='false'
                    aria-controls='approveJob'
                >
                    Chưa phê duyệt
                </button>
            </p>
            <div id='accordionExample'>
                <div
                    className='collapse'
                    id='postJobList'
                    data-bs-parent='#accordionExample'
                >
                    <div className='card card-body'>
                        <div className='container-custome'>
                            <div className='col'>
                                {loading ? (
                                    <p>Đang tải dữ liệu...</p>
                                ) : jobPosts.length > 0 ? (
                                    <div className='card card-body'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>Id</th>
                                                    <th scope='col'>
                                                        Tên công việc
                                                    </th>
                                                    <th scope='col'>
                                                        Tên công ty
                                                    </th>
                                                    <th scope='col'>
                                                        Mô tả công việc
                                                    </th>
                                                    <th scope='col'>
                                                        Ngày đăng
                                                    </th>
                                                    <th scope='col'>
                                                        Đăng bởi
                                                    </th>
                                                    <th scope='col'>
                                                        Hành động
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {jobPosts.map((jobPost) => (
                                                    <tr key={jobPost.id}>
                                                        <td>{jobPost.id}</td>
                                                        <td>{jobPost.title}</td>
                                                        <td>
                                                            {
                                                                jobPost.companyName
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                jobPost.jobDescription
                                                            }
                                                        </td>
                                                        <td>
                                                            {new Date(
                                                                jobPost.postDate
                                                            ).toLocaleDateString()}
                                                        </td>
                                                        <td>
                                                            {jobPost.userName}
                                                        </td>
                                                        <td>
                                                            <div className='d-flex'>
                                                                <button
                                                                    className='btn btn-danger me-1'
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            jobPost.id
                                                                        )
                                                                    }
                                                                >
                                                                    <AiOutlineDelete />
                                                                </button>
                                                                <button className='btn btn-warning'>
                                                                    <AiOutlineEyeInvisible />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p>Không có dữ liệu Nhà tuyển dụng.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className='collapse'
                    id='approveJob'
                    data-bs-parent='#accordionExample'
                >
                    <div className='card card-body'>
                        <h5>Bài đăng chưa phê duyệt</h5>
                        {unapprovedPosts.length > 0 ? (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Id</th>
                                        <th scope='col'>Tên công việc</th>
                                        <th scope='col'>Tên công ty</th>
                                        <th scope='col'>Ngày đăng</th>
                                        <th scope='col'>Đăng bởi</th>
                                        <th scope='col'>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unapprovedPosts.map((jobPost) => (
                                        <tr key={jobPost.id}>
                                            <td>{jobPost.id}</td>
                                            <td>{jobPost.title}</td>
                                            <td>{jobPost.companyName}</td>
                                            <td>
                                                {new Date(
                                                    jobPost.postDate
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>{jobPost.userName}</td>
                                            <td>
                                                <div className='d-flex'>
                                                    <button
                                                        className='btn btn-success me-1'
                                                        onClick={() =>
                                                            handleApprove(
                                                                jobPost.id
                                                            )
                                                        }
                                                    >
                                                        <AiOutlineCheckCircle />
                                                    </button>
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() =>
                                                            handleDelete(
                                                                jobPost.id
                                                            )
                                                        }
                                                    >
                                                        <AiOutlineCloseCircle />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Không có bài đăng cần phê duyệt.</p>
                        )}
                    </div>
                </div>
            </div>
            <div
                aria-live='polite'
                aria-atomic='true'
                className='position-relative'
            >
                <div className='toast-container position-absolute top-0 end-0 p-3'>
                    <div
                        id='toastSuccess'
                        className='toast'
                        role='alert'
                        aria-live='assertive'
                        aria-atomic='true'
                    >
                        <div className='toast-header'>
                            <strong className='me-auto'>Thông báo</strong>
                            <small className='text-muted'>just now</small>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='toast'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='toast-body'>
                            Bài đăng đã được phê duyệt thành công!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageJobPosts;
