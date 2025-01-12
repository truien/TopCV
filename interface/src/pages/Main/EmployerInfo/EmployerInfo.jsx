import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EmployerInfo.module.css';
import { toast } from 'react-toastify';
import CombinedEditor from '@components/CombinedEditor/CombinedEditor.jsx';

const EmployerInfo = () => {
    const Username = sessionStorage.getItem('username'); // Lấy Username từ sessionStorage
    const [employer, setEmployer] = useState({
        userName: '',
        companyName: '',
        companyInfo: '',
        address: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployer = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5224/api/Employer/infor/${Username}`
                );
                const data = response.data;
                data.map((data) => {
                    setEmployer({
                        userName: data.userName || '',
                        companyName: data.companyName || '',
                        companyInfo: data.companyInfo || '',
                        address: data.address || '',
                    });
                });
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
                setError('Không thể tải thông tin nhà tuyển dụng');
            }
        };

        if (Username) {
            fetchEmployer();
        }
    }, [Username]); // Sử dụng Username làm dependency

    const handleChangetext = (field, value) => {
        setEmployer((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employer.companyName || !employer.address) {
            setError('Tên công ty và địa chỉ không được để trống');
            return;
        }

        try {
            await axios.put(
                `http://localhost:5224/api/Employer/${Username}`,
                employer
            );
            toast.success('Cập nhật thành công');
        } catch (err) {
            setError('Lỗi khi cập nhật thông tin');
        }
    };

    if (!employer.userName && !error) return <div>Đang tải...</div>;
    if (error) return <div className='alert alert-danger'>{error}</div>;

    return (
        <div className={styles['edit-employer-info']}>
            <h2 className='text-center'>Sửa Thông Tin Nhà Tuyển Dụng</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='userName' className='form-label'>
                        Tên đăng nhập
                    </label>
                    <input
                        type='text'
                        id='userName'
                        name='userName'
                        className='form-control'
                        value={employer.userName}
                        disabled
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='companyName' className='form-label'>
                        Tên công ty
                    </label>
                    <input
                        type='text'
                        id='companyName'
                        name='companyName'
                        className='form-control'
                        value={employer.companyName || ''}
                        onChange={(e) =>
                            handleChangetext('companyName', e.target.value)
                        }
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='companyInfo' className='form-label'>
                        Thông tin công ty
                    </label>
                    <CombinedEditor
                        className='form-control'
                        name='companyInfo'
                        placeholder='Nhập thông tin công ty'
                        value={employer.companyInfo || ''}
                        onChange={(value) =>
                            handleChangetext('companyInfo', value)
                        }
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='address' className='form-label'>
                        Địa chỉ
                    </label>
                    <CombinedEditor
                        className='form-control'
                        name='address'
                        placeholder='Nhập địa chỉ'
                        value={employer.address || ''}
                        onChange={(value) => handleChangetext('address', value)}
                    />
                </div>

                <button type='submit' className='btn btn-primary'>
                    Cập nhật
                </button>
            </form>
        </div>
    );
};

export default EmployerInfo;
