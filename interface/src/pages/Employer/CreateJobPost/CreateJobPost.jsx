import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import CombinedEditor from '@components/CombinedEditor/CombinedEditor.jsx';
import styles from './CreateJobPost.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function JobPostForm() {
    const employerUsername = sessionStorage.getItem('username');
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        jobDescription: '',
        requirements: '',
        salaryRange: '',
        location: '',
        status: 1,
        postDate: new Date().toISOString(),
        userEmployer: employerUsername,
    });
    const [employmentTypes, setEmploymentTypes] = useState([]);
    const [jobFields, setJobFields] = useState([]);
    const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);
    const [selectedJobFields, setSelectedJobFields] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchEmploymentTypes = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5224/api/JobType/employmenttypes'
                );
                setEmploymentTypes(
                    response.data.map((type) => ({
                        value: type.id,
                        label: type.employmentTypeName,
                    }))
                );
            } catch (error) {
                console.error('Lỗi khi tải kiểu công việc:', error);
            }
        };

        const fetchJobFields = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5224/api/JobType/jobfields'
                );
                setJobFields(
                    response.data.map((field) => ({
                        value: field.id,
                        label: field.jobField,
                    }))
                );
            } catch (error) {
                console.error('Lỗi khi tải lĩnh vực công việc:', error);
            }
        };

        fetchEmploymentTypes();
        fetchJobFields();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title)
            newErrors.title = 'Tiêu đề công việc không được để trống';
        if (!formData.company)
            newErrors.company = 'Tên công ty không được để trống';
        if (!formData.jobDescription)
            newErrors.jobDescription = 'Mô tả công việc không được để trống';
        if (!formData.requirements)
            newErrors.requirements = 'Yêu cầu công việc không được để trống';
        if (selectedEmploymentTypes.length === 0)
            newErrors.employmentTypeId = 'Vui lòng chọn kiểu công việc';
        if (selectedJobFields.length === 0)
            newErrors.jobFieldId = 'Vui lòng chọn lĩnh vực công việc';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleEditorChange = (field, content) => {
        setFormData((prevData) => ({ ...prevData, [field]: content }));
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    };

    const handleEmploymentTypeChange = (selectedOptions) => {
        setSelectedEmploymentTypes(selectedOptions || []);
    };

    const handleJobFieldChange = (selectedOptions) => {
        setSelectedJobFields(selectedOptions || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Vui lòng điền đầy đủ các trường bắt buộc');
            return;
        }

        try {
            const jobPostResponse = await axios.post(
                'http://localhost:5224/api/JobPosts/add-jobpost',
                formData
            );
            const jobPostId = jobPostResponse.data.id;

            const employmentPromises = selectedEmploymentTypes.map(
                (employmentType) =>
                    axios.post(
                        'http://localhost:5224/api/JobPostType/add-jobpostemployment',
                        {
                            IDEmploymentType: employmentType.value,
                            IDJobPost: jobPostId,
                        }
                    )
            );

            const fieldPromises = selectedJobFields.map((jobField) =>
                axios.post(
                    'http://localhost:5224/api/JobPostType/add-jobpostfield',
                    {
                        JobFieldID: jobField.value,
                        JobPostID: jobPostId,
                    }
                )
            );

            await Promise.all([...employmentPromises, ...fieldPromises]);

            // Reset form
            setFormData({
                company: '',
                title: '',
                jobDescription: '',
                requirements: '',
                salaryRange: '',
                location: '',
                status: 1,
                postDate: new Date().toISOString(),
                userEmployer: employerUsername,
            });
            setSelectedEmploymentTypes([]);
            setSelectedJobFields([]);

            toast.success('Đăng tin thành công!');
        } catch (error) {
            toast.error('Lỗi khi thêm bài viết');
            console.error('Lỗi khi thêm bài viết:', error);
        }
    };

    return (
        <form className={'container'} onSubmit={handleSubmit}>
            <h2 className={styles['title'] + ' mb-5'}>Đăng tin tuyển dụng</h2>
            <div className='border p-5'>
                <div>
                    <label
                        htmlFor='title'
                        className='form-label fs-6 fw-bolder'
                    >
                        Tiêu đề
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title && (
                        <p className='text-danger'>{errors.title}</p>
                    )}
                </div>

                <div className='mt-2'>
                    <label
                        htmlFor='company'
                        className='form-label fs-6 fw-bolder'
                    >
                        Công ty
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        name='company'
                        value={formData.company}
                        onChange={handleChange}
                    />
                    {errors.company && (
                        <p className='text-danger'>{errors.company}</p>
                    )}
                </div>
                <div className='row'>
                    <div className='mt-2 col'>
                        <label
                            htmlFor='employmentTypeId'
                            className='form-label fs-6 fw-bolder'
                        >
                            Kiểu công việc
                        </label>
                        <Select
                            isMulti
                            options={employmentTypes}
                            value={selectedEmploymentTypes}
                            onChange={handleEmploymentTypeChange}
                            placeholder='Chọn kiểu công việc'
                        />
                        {errors.employmentTypeId && (
                            <p className='text-danger'>
                                {errors.employmentTypeId}
                            </p>
                        )}
                    </div>

                    <div className='mt-2 col'>
                        <label
                            htmlFor='jobFieldId'
                            className='form-label fs-6 fw-bolder'
                        >
                            Lĩnh vực công việc
                        </label>
                        <Select
                            isMulti
                            options={jobFields}
                            value={selectedJobFields}
                            onChange={handleJobFieldChange}
                            placeholder='Chọn lĩnh vực công việc'
                        />
                        {errors.jobFieldId && (
                            <p className='text-danger'>{errors.jobFieldId}</p>
                        )}
                    </div>
                </div>

                <div className='mt-2'>
                    <label
                        htmlFor='jobDescription'
                        className='form-label fs-6 fw-bolder'
                    >
                        Mô tả
                    </label>
                    <CombinedEditor
                        value={formData.jobDescription}
                        onChange={(content) =>
                            handleEditorChange('jobDescription', content)
                        }
                    />
                    {errors.jobDescription && (
                        <p className='text-danger'>{errors.jobDescription}</p>
                    )}
                </div>

                <div className='mt-2'>
                    <label
                        htmlFor='requirements'
                        className='form-label fs-6 fw-bolder'
                    >
                        Yêu cầu
                    </label>
                    <CombinedEditor
                        value={formData.requirements}
                        onChange={(content) =>
                            handleEditorChange('requirements', content)
                        }
                    />
                    {errors.requirements && (
                        <p className='text-danger'>{errors.requirements}</p>
                    )}
                </div>

                <div className='mt-2'>
                    <label
                        htmlFor='salaryRange'
                        className='form-label fs-6 fw-bolder'
                    >
                        Khoảng lương
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        name='salaryRange'
                        value={formData.salaryRange}
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-2'>
                    <label
                        htmlFor='location'
                        className='form-label fs-6 fw-bolder'
                    >
                        Địa điểm
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        name='location'
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-4'>
                    <button type='submit' className='btn btn-primary'>
                        Đăng tin
                    </button>
                </div>
            </div>
        </form>
    );
}

export default JobPostForm;
