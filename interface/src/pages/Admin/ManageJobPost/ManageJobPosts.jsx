import { useEffect, useState } from 'react';
import axios from 'axios';
import '../UserEmloyer/styles.css';
import { AiOutlineDelete, AiOutlineEyeInvisible } from 'react-icons/ai';

function ManageJobPosts() {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
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

    const handleDelete = async (postId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
            try {
                await axios.delete(
                    `http://localhost:5224/api/JobPosts/delete-jobpost/${postId}`
                );
                setJobPosts((prevPosts) =>
                    prevPosts.filter((post) => post.id !== postId)
                );
            } catch (error) {
                console.log('Đã xảy ra lỗi khi xóa bài đăng', error);
            }
        }
    };

    return (
        <div className='container-custome'>
            <div className='container container-fluid py-2 mb-5 mt-3'>
                <h1 className='text-custom fs-1'>Quản lý bài tuyển dụng</h1>
            </div>
            <div className='col'>
                {loading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : jobPosts.length > 0 ? (
                    <div className='card card-body'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Id</th>
                                    <th scope='col'>Tên công việc</th>
                                    <th scope='col'>Tên công ty</th>
                                    <th scope='col'>Mô tả công việc</th>
                                    <th scope='col'>Ngày đăng</th>
                                    <th scope='col'>Đăng bởi</th>
                                    <th scope='col'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobPosts.map((jobPost) => (
                                    <tr key={jobPost.id}>
                                        <td>{jobPost.id}</td>
                                        <td>{jobPost.title}</td>
                                        <td>{jobPost.companyName}</td>
                                        <td>{jobPost.jobDescription}</td>
                                        <td>
                                            {new Date(
                                                jobPost.postDate
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>{jobPost.userName}</td>
                                        <td>
                                            <div className='d-flex'>
                                                <button
                                                    className='btn btn-danger me-1'
                                                    onClick={() =>
                                                        handleDelete(jobPost.id)
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
    );
}

export default ManageJobPosts;
