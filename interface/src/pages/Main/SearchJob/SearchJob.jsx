import { FaChevronRight, FaFilter, FaBriefcase } from 'react-icons/fa6';
import Select from 'react-select';
import styles from './SearchJob.module.css';
import { useState, useEffect } from 'react';
import SearchJobCard from '@components/SearchJobCard/SearchJobCard.jsx';
import {Link} from 'react-router-dom'
const SearchJob = () => {
    const [employmentTypes, setEmploymentTypes] = useState([]);
    const [jobFields, setJobFields] = useState([]);
    const [selectedField, setSelectedField] = useState('');
    const [selectedEmploymentType, setSelectedEmploymentType] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedSalary, setSelectedSalary] = useState('');
    const [jobPosts, setJobPosts] = useState([]); // Dữ liệu bài đăng công việc
    const [totalCount, setTotalCount] = useState(0); // Tổng số bài đăng
    const [page, setPage] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(10); // Kích thước trang

    useEffect(() => {
        fetchJobFields();
        fetchEmploymentTypes();
    }, []);

    const fetchJobFields = async () => {
        try {
            const response = await fetch(
                'http://localhost:5224/api/JobType/jobfields'
            );
            const data = await response.json();
            const options = [
                { value: '', label: 'Tất cả lĩnh vực' },
                ...data.map((field) => ({
                    value: field.id,
                    label: field.jobField,
                })),
            ];
            setJobFields(options);
        } catch (error) {
            console.error('Error fetching job fields:', error);
        }
    };
    const fetchEmploymentTypes = async () => {
        try {
            const response = await fetch(
                'http://localhost:5224/api/JobType/employmenttypes'
            );
            const data = await response.json();

            const optionEmployment = [
                { value: '', label: 'Tất cả loại hình công việc' },
                ...data.map((type) => ({
                    value: type.id,
                    label: type.employmentTypeName,
                })),
            ];
            setEmploymentTypes(optionEmployment);
        } catch (error) {
            console.error('Error fetching employment types:', error);
        }
    };

    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5224/api/JobPosts/filter?jobFieldId=${selectedField}&employmentTypeId=${selectedEmploymentType}&location=${selectedLocation}&salaryrange=${selectedSalary}&page=${page}&pageSize=${pageSize}`
                );
                const data = await response.json();

                if (data) {
                    setJobPosts(data.data);
                    setTotalCount(data.totalCount);
                }
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };
        fetchJobPosts();
    }, [
        selectedField,
        selectedEmploymentType,
        selectedLocation,
        selectedSalary,
        page,
        pageSize,
    ]);

    const handleChangeEmploymentType = (selectedOption) => {
        setSelectedEmploymentType(selectedOption.value);
    };
    const handleChange = (selectedOption) => {
        setSelectedField(selectedOption.value);
    };
    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.id === 'all' ? '' : event.target.id);
    };
    const handleSalaryChange = (e) => {
        setSelectedSalary(
            e.target.value === 'Thoả thuận' ? '' : e.target.value
        );
    };
    const handleDelete = () => {
        setSelectedEmploymentType('');
        setSelectedField('');
        setSelectedLocation('');
        setSelectedSalary('');
    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
    };
    const optionSert = [
        {
            value: 'all',
            label: <>Đề xuất của AI</>,
        },
        { value: '1', label: 'Ngày đăng' },
        { value: '2', label: 'Ngày nộp hồ sơ' },
    ];
    return (
        <>
            <div className='container mb-5' style={{ backgroundColor: '#F3F5F7' }}>
                <section className='p-4'>
                    <h1 className={styles['search-job-heading']}>
                        Tuyển dụng 30.534 việc làm [Update 13/01/2025]
                    </h1>
                    <div>
                        <Link to='/' className={styles['nav-item']}>Trang chủ</Link>
                        <FaChevronRight
                            className='mx-2'
                            style={{
                                color: '#212f3f',
                                fontSize: '15px',
                                fontWeight: '100',
                                lineHeight: '20px',
                            }}
                        />
                        <p className={styles['navp']}>
                            Tuyển dụng 30.534 việc làm 2025 [Update 13/01/2025]
                        </p>
                    </div>
                </section>
                <section className='result-job-search mt-1'>
                    <div className='row'>
                        <div className='col-3 p-1'>
                            <div className='advanced-filter_header d-flex justify-content-between p-2'>
                                <div className={styles['advend']}>
                                    <FaFilter
                                        color='#00b14f'
                                        className='me-3'
                                    />
                                    Lọc nâng cao
                                </div>
                                <div
                                    onClick={() => {
                                        handleDelete();
                                    }}
                                    className={
                                        styles['btnclose'] + ' btn btn-danger'
                                    }
                                >
                                    Xoá lọc
                                </div>
                            </div>
                            <hr />
                            <div className={styles['seach']}>
                                <div className='location'>
                                    <div
                                        className={
                                            styles[
                                                'advanced-filter_options-header'
                                            ]
                                        }
                                    >
                                        Theo địa chỉ
                                    </div>
                                    <div
                                        className={styles['location'] + ' mt-3'}
                                    >
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='all'
                                                checked={
                                                    selectedLocation === ''
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='all'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Tất cả
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Hà Nội'
                                                checked={
                                                    selectedLocation ===
                                                    'Hà Nội'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Hà Nội'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Hà Nội
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Nghệ An'
                                                checked={
                                                    selectedLocation ===
                                                    'Nghệ An'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Nghệ An'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Nghệ An
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Đà Nẵng'
                                                checked={
                                                    selectedLocation ===
                                                    'Đà Nẵng'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Đà Nẵng'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Đà Nẵng
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='TP.HCM'
                                                checked={
                                                    selectedLocation ===
                                                    'TP.HCM'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='TP.HCM'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                TP.HCM
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Hải Dương'
                                                checked={
                                                    selectedLocation ===
                                                    'Hải Dương'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Hải Dương'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Hải Dương
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Bắc Ninh'
                                                checked={
                                                    selectedLocation ===
                                                    'Bắc Ninh'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Bắc Ninh'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Bắc Ninh
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Thanh Hoá'
                                                checked={
                                                    selectedLocation ===
                                                    'Thanh Hoá'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Thanh Hoá'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Thanh Hoá
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Hà Tĩnh'
                                                checked={
                                                    selectedLocation ===
                                                    'Hà Tĩnh'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Hà Tĩnh'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Hà Tĩnh
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Lâm Đồng'
                                                checked={
                                                    selectedLocation ===
                                                    'Lâm Đồng'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Lâm Đồng'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Lâm Đồng
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Đồng Nai'
                                                checked={
                                                    selectedLocation ===
                                                    'Đồng Nai'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Đồng Nai'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Đồng Nai
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Bình Dương'
                                                checked={
                                                    selectedLocation ===
                                                    'Bình Dương'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Bình Dương'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Bình Dương
                                            </label>
                                        </div>
                                        <div className='form-check d-flex align-content-center'>
                                            <input
                                                style={{
                                                    fontSize: '12px',
                                                }}
                                                className='form-check-input me-2'
                                                type='radio'
                                                name='locationRadio'
                                                id='Cần Thơ'
                                                checked={
                                                    selectedLocation ===
                                                    'Cần Thơ'
                                                }
                                                onChange={handleLocationChange}
                                            />
                                            <label
                                                className='form-check-label'
                                                htmlFor='Cần Thơ'
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                }}
                                            >
                                                Cần Thơ
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className='salary'>
                                    <div
                                        className={
                                            styles[
                                                'advanced-filter_options-header'
                                            ]
                                        }
                                    >
                                        Theo mức lương
                                    </div>
                                    <div className='row my-3'>
                                        <div className='col-6'>
                                            {[
                                                {
                                                    id: 'salary',
                                                    label: 'Tất cả',
                                                    value: '',
                                                },
                                                {
                                                    id: 'salary1',
                                                    label: '10-15 triệu',
                                                    value: '10-15 triệu',
                                                },
                                                {
                                                    id: 'salary2',
                                                    label: '20-25 triệu',
                                                    value: '20-25 triệu',
                                                },
                                                {
                                                    id: 'salary4',
                                                    label: '30-50 triệu',
                                                    value: '30-50 triệu',
                                                },
                                                {
                                                    id: 'salary5',
                                                    label: 'Thoả thuận',
                                                    value: 'Thoả thuận',
                                                },
                                            ].map((salary) => (
                                                <div
                                                    className='form-check d-flex align-content-center'
                                                    key={salary.id}
                                                >
                                                    <input
                                                        style={{
                                                            fontSize: '12px',
                                                        }}
                                                        className='form-check-input me-2'
                                                        type='radio'
                                                        name='salaryRadio'
                                                        id={salary.id}
                                                        value={salary.value}
                                                        checked={
                                                            selectedSalary ===
                                                            salary.value
                                                        }
                                                        onChange={
                                                            handleSalaryChange
                                                        }
                                                    />
                                                    <label
                                                        className='form-check-label'
                                                        htmlFor={salary.id}
                                                        style={{
                                                            fontSize: '14px',
                                                            color: '#333',
                                                        }}
                                                    >
                                                        {salary.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        <div className='col-6'>
                                            {[
                                                {
                                                    id: 'salary6',
                                                    label: '0-10 triệu',
                                                    value: '0-10 triệu',
                                                },
                                                {
                                                    id: 'salary7',
                                                    label: '15-20 triệu',
                                                    value: '15-20 triệu',
                                                },
                                                {
                                                    id: 'salary9',
                                                    label: '25-30 triệu',
                                                    value: '25-30 triệu',
                                                },
                                                {
                                                    id: 'salary10',
                                                    label: '50-100 triệu',
                                                    value: '50-100 triệu',
                                                },
                                            ].map((salary) => (
                                                <div
                                                    className='form-check d-flex align-content-center'
                                                    key={salary.id}
                                                >
                                                    <input
                                                        style={{
                                                            fontSize: '12px',
                                                        }}
                                                        className='form-check-input me-2'
                                                        type='radio'
                                                        name='salaryRadio'
                                                        id={salary.id}
                                                        value={salary.value}
                                                        checked={
                                                            selectedSalary ===
                                                            salary.value
                                                        }
                                                        onChange={
                                                            handleSalaryChange
                                                        }
                                                    />
                                                    <label
                                                        className='form-check-label'
                                                        htmlFor={salary.id}
                                                        style={{
                                                            fontSize: '14px',
                                                            color: '#333',
                                                        }}
                                                    >
                                                        {salary.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className='JobFields'>
                                    <div
                                        className={
                                            styles[
                                                'advanced-filter_options-header'
                                            ]
                                        }
                                    >
                                        Lĩnh vực công việc
                                    </div>
                                    <div className='mt-3'>
                                        <Select
                                            options={jobFields}
                                            onChange={handleChange}
                                            defaultValue={{
                                                value: '',
                                                label: 'Tất cả lĩnh vực',
                                            }}
                                            isSearchable={true}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    border: '1px solid #00b14f',
                                                    fontSize: '14px', // Cỡ chữ trong ô chọn
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    fontSize: '14px',
                                                    border: '1px solid #00b14f', // Cỡ chữ trong menu thả xuống
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    fontSize: '14px',
                                                    backgroundColor:
                                                        state.isFocused
                                                            ? 'white'
                                                            : 'white',
                                                    color: state.isSelected
                                                        ? '#00b14f'
                                                        : 'black',
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }),
                                            }}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className='Employment my-3'>
                                    <div
                                        className={
                                            styles[
                                                'advanced-filter_options-header'
                                            ]
                                        }
                                    >
                                        Hình thức làm việc
                                    </div>
                                    <div>
                                        <Select
                                            options={employmentTypes}
                                            defaultValue={{
                                                value: '',
                                                label: 'Tất cả loại hình công việc',
                                            }}
                                            onChange={
                                                handleChangeEmploymentType
                                            }
                                            isSearchable={true}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    border: '1px solid #00b14f',
                                                    fontSize: '14px', // Cỡ chữ trong ô chọn
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    fontSize: '14px',
                                                    border: '1px solid #00b14f', // Cỡ chữ trong menu thả xuống
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    fontSize: '14px',
                                                    backgroundColor:
                                                        state.isFocused
                                                            ? 'white'
                                                            : 'white',
                                                    color: state.isSelected
                                                        ? '#00b14f'
                                                        : 'black',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-9 p-1'>
                            <div className='d-flex align-content-center flex-row-reverse '>
                                <Select
                                    options={optionSert}
                                    defaultValue={optionSert[0]}
                                    isSearchable={true}
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            border: '1px solid #00b14f',
                                            fontSize: '14px', // Cỡ chữ trong ô chọn
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            fontSize: '14px',
                                            border: '1px solid #00b14f', // Cỡ chữ trong menu thả xuống
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            fontSize: '14px',
                                            backgroundColor: state.isFocused
                                                ? 'white'
                                                : 'white',
                                            color: state.isSelected
                                                ? '#00b14f'
                                                : 'black',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }),
                                        singleValue: (base) => ({
                                            ...base,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }),
                                    }}
                                />
                                <span className='me-3 p-2'>Ưu tiên theo</span>
                            </div>
                            <div className='mt-2'>
                                <div className={styles['seach']}>
                                    {jobPosts && jobPosts.length > 0 ? (
                                        jobPosts.map((job) => {
                                            return (
                                                <SearchJobCard
                                                    key={job.id}
                                                    job={job}
                                                />
                                            );
                                        })
                                    ) : (
                                        <div>
                                            Không có công việc theo yêu cầu
                                        </div>
                                    )}
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button
                                        className='btn btn-link'
                                        onClick={() =>
                                            handlePageChange(page - 1)
                                        }
                                        disabled={page <= 1}
                                    >
                                        Trang trước
                                    </button>
                                    <span className='p-2'>{page}</span>
                                    <button
                                        className='btn btn-link'
                                        onClick={() =>
                                            handlePageChange(page + 1)
                                        }
                                        disabled={page * pageSize >= totalCount}
                                    >
                                        Trang sau
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SearchJob;
