import { useUserContext } from '@hooks/UserContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    AiOutlineDelete,
    AiOutlineEyeInvisible,
    AiOutlineFileAdd,
} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function JobPostManage() {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const username = user?.username;
    const [jobPosts, setJobPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5224/api/Employer/get-jobpost/${username}`
                );
                setJobPosts(response.data);
                setError(''); // Reset error if fetch is successful
            } catch (error) {
                setError('Đã xảy ra lỗi khi tải dữ liệu.');
                console.error('Error:', error);
            }
        };

        if (username) {
            fetchData();
        }
    }, [username]);

    const handleDelete = async (postId) => {
        try {
            await axios.delete(
                `http://localhost:5224/api/JobPosts/delete-jobpost/${postId}`
            );
            setJobPosts(jobPosts.filter((post) => post.id !== postId));
        } catch (error) {
            setError('Không thể xóa bài đăng.');
            console.error('Delete error:', error);
        }
    };

    const handleHide = async (postId) => {
        try {
            await axios.put(
                `http://localhost:5224/api/Employer/hide-jobpost/${postId}`
            );
            setJobPosts(
                jobPosts.map((post) =>
                    post.id === postId
                        ? { ...post, status: post.status === 1 ? 0 : 1 }
                        : post
                )
            );
        } catch (error) {
            setError('Không thể cập nhật trạng thái bài đăng.');
            console.error('Hide error:', error);
        }
    };
    const handClick = () => {
        sessionStorage.setItem('activeLink', '/employer/settings');
        navigate('/employer/createjobpost');
    };

    return (
        <>
            <div className='d-flex justify-content-between'>
                <h2>Quản lý bài đăng</h2>
                <button className='btn btn-success' onClick={handClick}>
                    <AiOutlineFileAdd /> Tạo bài mới
                </button>
            </div>

            {error && <p className='text-danger'>{error}</p>}
            {jobPosts.length > 0 ? (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Công ty</th>
                            <th>Mô tả</th>
                            <th>Ngày đăng</th>
                            <th>Khoảng lương</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobPosts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.company}</td>
                                <td>{post.jobDescription}</td>
                                <td>
                                    {new Date(
                                        post.postDate
                                    ).toLocaleDateString()}
                                </td>
                                <td>{post.salaryRange}</td>
                                <td>
                                    <div className='d-flex'>
                                        <button
                                            className='btn btn-danger me-1'
                                            onClick={() =>
                                                handleDelete(post.id)
                                            }
                                        >
                                            <AiOutlineDelete />
                                        </button>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => handleHide(post.id)}
                                        >
                                            <AiOutlineEyeInvisible />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Không có bài đăng nào</p>
            )}
        </>
    );
}

export default JobPostManage;
