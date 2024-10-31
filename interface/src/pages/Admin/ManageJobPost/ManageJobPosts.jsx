import { useEffect, useState } from 'react';
import axios from 'axios';
import '../UserEmloyer/styles.css';
import { AiOutlineDelete } from 'react-icons/ai';

function ManageJobPosts() {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5224/api/JobPosts/get-all-jobpost'
                );
                const data = response.data;
                setJobPosts(data);
            } catch (error) {
                console.log('Đã xảy ra lỗi', error);
            } finally {
                setLoading(false); // Đặt loading là false sau khi fetch hoàn tất
            }
        };
        fetchData();
    }, []);

    return (
        <div className='container-custome'>
            <div className='container container-fluid py-2 mb-5 mt-3'>
                <h1 className='text-custom fs-1'>Quản lý bài tuyển dụng</h1>
            </div>
            <div className='col'>
                {loading ? ( // Hiển thị thông báo khi đang tải
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
                                        {' '}
                                        {/* Đảm bảo sử dụng id duy nhất */}
                                        <td>{jobPost.id}</td>
                                        <td>{jobPost.title}</td>
                                        <td>{jobPost.companyName}</td>
                                        <td>{jobPost.jobDescription}</td>
                                        <td>{jobPost.postDate}</td>
                                        <td>{jobPost.userName}</td>
                                        <td>
                                            <button className='btn btn-danger me-1'>
                                                <AiOutlineDelete />
                                            </button>
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
