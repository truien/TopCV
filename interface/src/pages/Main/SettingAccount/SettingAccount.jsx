import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function SettingAccount() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        passwordOld: '',
        passwordNew: '',
        passwordAgain: '',
        avatar: null,
    });
    const [errors, setErrors] = useState({});
    const username = sessionStorage.getItem('username');
    const [currentPassword, setCurrentPassword] = useState('');

    useEffect(() => {
        if (username) {
            const loadUserData = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:5224/api/Users/${username}`
                    );
                    const user = response.data;
                    setFormData({
                        username: user.userName,
                        email: user.email,
                        passwordOld: '',
                        passwordNew: '',
                        passwordAgain: '',
                        avatar: user.avatar,
                    });
                    setCurrentPassword(user.password);
                } catch (error) {
                    console.error('Error loading user data:', error);
                }
            };

            loadUserData();
        }
    }, [username]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = 'Vui lòng nhập tên người dùng.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ.';
        }
        if (!formData.passwordOld.trim()) {
            newErrors.passwordOld = 'Vui lòng nhập mật khẩu hiện tại.';
        }
        if (!formData.passwordNew.trim()) {
            newErrors.passwordNew = 'Vui lòng nhập mật khẩu mới.';
        } else if (formData.passwordNew.length < 6) {
            newErrors.passwordNew = 'Mật khẩu mới phải ít nhất 6 ký tự.';
        }
        if (formData.passwordNew !== formData.passwordAgain) {
            newErrors.passwordAgain = 'Mật khẩu xác nhận không khớp.';
        }
        if (formData.passwordOld !== currentPassword) {
            newErrors.passwordOld = 'Mật khẩu không chính xác';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const payload = new FormData();
        payload.append('username', formData.username);
        payload.append('email', formData.email);
        payload.append('passwordNew', formData.passwordNew);
        if (formData.avatar) payload.append('avatar', formData.avatar);
        try {
            await axios.put(
                `http://localhost:5224/api/Users/${username}`,
                payload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            toast.success('Cập nhật thành công');
            const newAvatarURL = URL.createObjectURL(formData.avatar);
            sessionStorage.setItem('avatar', newAvatarURL);
            setFormData({
                username: username, 
                email: formData.email, 
                passwordOld: '',
                passwordNew: '',
                passwordAgain: '',
                avatar: null,
            });
        } catch (error) {
            console.error('Lỗi khi cập nhật tài khoản:', error);
            toast.error('Vui lòng thử lại');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cài đặt tài khoản</h2>
            <div className='border p-4'>
                <div>
                    <label
                        htmlFor='username'
                        className='form-label fs-6 fw-bolder'
                    >
                        UserName
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        name='username'
                        id='username'
                        value={formData.username}
                        readOnly
                    />
                    {errors.username && (
                        <p className='text-danger'>{errors.username}</p>
                    )}
                </div>
                <div className='mt-2'>
                    <label
                        htmlFor='email'
                        className='form-label fs-6 fw-bolder'
                    >
                        Email
                    </label>
                    <input
                        className='form-control'
                        type='email'
                        name='email'
                        id='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className='text-danger'>{errors.email}</p>
                    )}
                </div>
                <div className='mt-2'>
                    <label
                        htmlFor='passwordOld'
                        className='form-label fs-6 fw-bolder'
                    >
                        Mật khẩu hiện tại
                    </label>
                    <input
                        className='form-control'
                        type='password'
                        name='passwordOld'
                        placeholder='Nhập mật khẩu hiện tại'
                        value={formData.passwordOld}
                        onChange={handleChange}
                    />
                    {errors.passwordOld && (
                        <p className='text-danger'>{errors.passwordOld}</p>
                    )}
                </div>
                <div className='mt-2'>
                    <label
                        htmlFor='passwordNew'
                        className='form-label fs-6 fw-bolder'
                    >
                        Mật khẩu mới
                    </label>
                    <input
                        className='form-control'
                        type='password'
                        name='passwordNew'
                        placeholder='Nhập mật khẩu mới'
                        value={formData.passwordNew}
                        onChange={handleChange}
                    />
                    {errors.passwordNew && (
                        <p className='text-danger'>{errors.passwordNew}</p>
                    )}
                </div>
                <div className='mt-2'>
                    <label
                        htmlFor='passwordAgain'
                        className='form-label fs-6 fw-bolder'
                    >
                        Nhập lại mật khẩu
                    </label>
                    <input
                        className='form-control'
                        type='password'
                        name='passwordAgain'
                        placeholder='Xác nhận lại mật khẩu'
                        value={formData.passwordAgain}
                        onChange={handleChange}
                    />
                    {errors.passwordAgain && (
                        <p className='text-danger'>{errors.passwordAgain}</p>
                    )}
                </div>
                <div className='mt-2'>
                    <label
                        htmlFor='avatar'
                        className='form-label fs-6 fw-bolder me-2'
                    >
                        Chọn ảnh đại diện
                    </label>
                    <input
                        type='file'
                        name='avatar'
                        id='avatar'
                        onChange={handleChange}
                    />
                </div>
                <div className='mt-4'>
                    <button type='submit' className='btn btn-primary'>
                        Lưu thông tin
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SettingAccount;
