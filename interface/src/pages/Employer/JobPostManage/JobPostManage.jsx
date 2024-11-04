import { useUserContext } from '@hooks/UserContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

function JobPostManage() {
    const { user } = useUserContext();
    const username = user?.username;
    const [jobPosts, setJobPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async (username) => {
            try {
                const response = await axios.get(
                    `http://localhost:5224/api/Employer/get-jobpost/${username}`
                );
                const data = response.data;
                setJobPosts(data);
                setError(''); // Reset error if fetch is successful
            } catch (error) {
                setError('Đã xảy ra lỗi khi tải dữ liệu.');
                console.log('Đã xảy ra lỗi', error);
            }
        };

        if (username) {
            fetchData(username);
        }
    }, [username]);

    return (
        <>
            <h2>Quản lý bài đăng</h2>
            {error && <p className='text-danger'>{error}</p>}
            {/* Hiển thị lỗi nếu có */}
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
                        </tr>
                    </thead>
                    <tbody>
                        {jobPosts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.company}</td>
                                <td>{post.jobDescription}</td>
                                <td>{new Date(post.postDate).toLocaleDateString()}</td>
                                <td>{post.salaryRange}</td>
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
