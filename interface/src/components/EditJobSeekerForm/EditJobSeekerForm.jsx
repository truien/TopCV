import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CombinedEditor from '@components/CombinedEditor/CombinedEditor.jsx';

function EditJobSeekerForm({ idPost, onCancel, onSave }) {
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
            try {
                toast.promise(
                    axios.get(
                        `http://localhost:5224/api/JobPosts/get-jobpost/${idPost}`
                    ),
                    {
                        pending: 'Đang tải dữ liệu...',
                        error: 'Có lỗi xảy ra khi tải dữ liệu.',
                    }
                );
                const response = await axios.get(
                    `http://localhost:5224/api/JobPosts/get-jobpost/${idPost}`
                );
                setFormData({
                    title: response.data.i.title,
                    jobDescription: response.data.i.jobDescription,
                    requirements: response.data.i.requirements,
                    interest: response.data.i.interest || '',
                    salaryRange: response.data.i.salaryRange,
                    location: response.data.i.location,
                });
            } catch (error) {
                console.error(error);
                toast.error('Có lỗi xảy ra khi tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [idPost]);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5224/api/JobPosts/update-jobpost/${idPost}`,
                formData
            );
            toast.success('Cập nhật bài đăng thành công!');
            onSave();
        } catch (error) {
            console.error(error);
            toast.error('Có lỗi xảy ra khi cập nhật bài đăng!');
        }
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <div className='container'>
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
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='jobDescription'
                            className='form-label fs-6 fw-bolder'
                        >
                            Mô tả công việc
                        </label>
                        <CombinedEditor
                            className='form-control'
                            name='jobDescription'
                            value={formData.jobDescription}
                            onChange={(value) =>
                                handleChange('jobDescription', value)
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='requirements'
                            className='form-label fs-6 fw-bolder'
                        >
                            Yêu cầu
                        </label>
                        <CombinedEditor
                            className='form-control'
                            name='requirements'
                            value={formData.requirements}
                            onChange={(value) =>
                                handleChange('requirements', value)
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='interest'
                            className='form-label fs-6 fw-bolder'
                        >
                            Quyền lợi
                        </label>
                        <CombinedEditor
                            className='form-control'
                            name='interest'
                            value={formData.interest}
                            onChange={(value) =>
                                handleChange('interest', value)
                            }
                        />
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mt-4'>
                        <button type='submit' className='btn btn-primary'>
                            Lưu
                        </button>
                    </div>
                    <div className='mt-2'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={onCancel}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditJobSeekerForm;
