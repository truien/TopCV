import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditJobSeekerForm({ idPost }) {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        jobDescription: '',
        requirements: '',
        interest: '',
        salaryRange: '',
        location: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            toast.promise(
                axios.get(`http://localhost:5224/api/JobPosts/get-jobpost/${idPost}`),
                {
                    pending: 'Đang tải dữ liệu...',
                    error: 'Có lỗi xảy ra khi tải dữ liệu.',
                }
            )
            .then(response => {
                setPost(response.data);
                setFormData({
                    title: response.data.title,
                    jobDescription: response.data.jobDescription,
                    requirements: response.data.requirements,
                    interest: response.data.interest || '',
                    salaryRange: response.data.salaryRange,
                    location: response.data.location,
                });
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
        };
        fetchData();
    }, [idPost]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5224/api/JobPosts/update-jobpost/${idPost}`,
                formData
            );
           toast.success('Cập nhật bài đăng thành công!');
        } catch (error) {
            console.error(error);
            toast.error('Có lỗi xảy ra khi cập nhật bài đăng!');
        }
    };

    if (loading) return <div>Đang tải dữ liệu...</div>;

    return (
        <div className='container'>
            {post ? (
                <form onSubmit={handleSubmit}>
                    <h2>Sửa bài đăng</h2>
                    <div className='bolder mt-5'>
                        <div>
                            <label
                                htmlFor='title'
                                className='form-label fs-6 fw-bolder'
                            >
                                Tiêu đề
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                name='title'
                                placeholder='Nhập tiêu đề'
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='jobDescription'
                                className='form-label fs-6 fw-bolder'
                            >
                                Mô tả công việc
                            </label>
                            <textarea
                                className='form-control'
                                name='jobDescription'
                                value={formData.jobDescription}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <label
                                htmlFor='requirements'
                                className='form-label fs-6 fw-bolder'
                            >
                                Yêu cầu
                            </label>
                            <textarea
                                className='form-control'
                                name='requirements'
                                value={formData.requirements}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <label
                                htmlFor='interest'
                                className='form-label fs-6 fw-bolder'
                            >
                                Quyền lợi
                            </label>
                            <textarea
                                className='form-control'
                                name='interest'
                                value={formData.interest}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <label
                                htmlFor='salaryRange'
                                className='form-label fs-6 fw-bolder'
                            >
                                Khoảng lương
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                name='salaryRange'
                                value={formData.salaryRange}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='location'
                                className='form-label fs-6 fw-bolder'
                            >
                                Địa điểm
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mt-4'>
                            <button type='submit' className='btn btn-primary'>
                                Lưu
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div>Đang tải dữ liệu...</div>
            )}
        </div>
    );
}

export default EditJobSeekerForm;
