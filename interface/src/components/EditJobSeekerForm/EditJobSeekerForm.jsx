import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditJobSeekerForm = () => {
    const username = sessionStorage.getItem('username');
    const [jobSeeker, setJobSeeker] = useState({
        userName: '',
        fullName: '',
        dateOfBirth: '',
        educationLevel: '',
        experienceYears: '',
        skills: '',
        address: '',
        cvFile: null,
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobSeekerData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5224/infor/${username}`
                );
                const data = response.data;
                setJobSeeker({
                    userName: data.userName || '',
                    fullName: data.fullName || '',
                    dateOfBirth: data.dateOfBirth || '',
                    educationLevel: data.educationLevel || '',
                    experienceYears: data.experienceYears || '',
                    skills: data.skills || '',
                    address: data.address || '',
                    cvFile: data.cvLink || '',
                });
            } catch (err) {
                console.error('Error fetching job seeker data:', err);
                setError('Không thể tải thông tin người tìm việc');
            }
        };

        fetchJobSeekerData();
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobSeeker((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = ['pdf', 'doc', 'docx'];

        if (
            file &&
            !allowedExtensions.includes(
                file.name.split('.').pop().toLowerCase()
            )
        ) {
            setError('Chỉ hỗ trợ tệp PDF, DOC, hoặc DOCX');
            return;
        }
        setJobSeeker((prevData) => ({
            ...prevData,
            cvFile: file,
        }));
        setError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userName', jobSeeker.userName);
        formData.append('fullName', jobSeeker.fullName);
        formData.append('dateOfBirth', jobSeeker.dateOfBirth);
        formData.append('educationLevel', jobSeeker.educationLevel);
        formData.append('experienceYears', jobSeeker.experienceYears);
        formData.append('skills', jobSeeker.skills);
        formData.append('address', jobSeeker.address);

        if (jobSeeker.cvFile) {
            formData.append('cvFile', jobSeeker.cvFile);
        }

        try {
            await axios.put(
                `http://localhost:5224/${jobSeeker.userName}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            toast.success('Cập nhật thông tin thành công!');
        } catch (err) {
            setError('Lỗi khi cập nhật thông tin');
        }
    };

    if (error) toast.error(error);

    return (
        <div className='container'>
            <h2>Sửa Thông Tin Người Tìm Việc</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='fullName' className='form-label'>
                        Họ và Tên
                    </label>
                    <input
                        type='text'
                        id='fullName'
                        name='fullName'
                        className='form-control'
                        value={jobSeeker.fullName || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='dateOfBirth' className='form-label'>
                        Ngày Sinh
                    </label>
                    <input
                        type='date'
                        id='dateOfBirth'
                        name='dateOfBirth'
                        className='form-control'
                        value={jobSeeker.dateOfBirth || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='educationLevel' className='form-label'>
                        Trình Độ Học Vấn
                    </label>
                    <input
                        type='text'
                        id='educationLevel'
                        name='educationLevel'
                        className='form-control'
                        value={jobSeeker.educationLevel || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='experienceYears' className='form-label'>
                        Số Năm Kinh Nghiệm
                    </label>
                    <input
                        type='number'
                        id='experienceYears'
                        name='experienceYears'
                        className='form-control'
                        value={jobSeeker.experienceYears || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='skills' className='form-label'>
                        Kỹ Năng
                    </label>
                    <input
                        type='text'
                        id='skills'
                        name='skills'
                        className='form-control'
                        value={jobSeeker.skills || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='address' className='form-label'>
                        Địa Chỉ
                    </label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        className='form-control'
                        value={jobSeeker.address || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='cvFile' className='form-label'>
                        CV (Tệp)
                    </label>
                    <input
                        type='file'
                        id='cvFile'
                        name='cvFile'
                        className='form-control'
                        onChange={handleFileChange}
                    />
                    {jobSeeker.cvFile !== null ? (
                        <div className='mt-2'>
                            <a
                                href={jobSeeker.cvFile}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='btn btn-outline-success btn-sm'
                            >
                                Tải CV
                            </a>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <button type='submit' className='btn btn-primary'>
                    Cập Nhật
                </button>
            </form>
        </div>
    );
};

export default EditJobSeekerForm;
