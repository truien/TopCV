import { useState } from 'react';
import styles from './styles.module.css';

function Sign() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        accountType: 'seekerjob',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validate = () => {
        let validationErrors = {};
        let isValid = true;

        // Họ tên
        if (!formData.fullName) {
            validationErrors.fullName = 'Họ và tên không được để trống';
            isValid = false;
        }

        // Email
        if (!formData.email) {
            validationErrors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Email không hợp lệ';
            isValid = false;
        }

        // Mật khẩu
        if (!formData.password) {
            validationErrors.password = 'Mật khẩu không được để trống';
            isValid = false;
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
            isValid = false;
        }

        // Xác nhận mật khẩu
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword =
                'Mật khẩu và xác nhận mật khẩu không khớp';
            isValid = false;
        }

        // Điều khoản
        if (!formData.termsAccepted) {
            validationErrors.termsAccepted = 'Bạn phải đồng ý với điều khoản';
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
            // Gửi dữ liệu lên API hoặc xử lý tiếp
        }
    };

    return (
        <div
            className='d-flex justify-content-center align-items-center'
            style={{ minHeight: '100vh' }}
        >
            <div className='row w-100'>
                <div className='col-md-7 container-fluid p-4 border rounded bg-white'>
                    <h4 className='text-success text-center'>
                        Chào mừng bạn đến với TopCV
                    </h4>
                    <p className='text-center'>
                        Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội
                        sự nghiệp lý tưởng
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='fullName' className='form-label'>
                                Họ và tên
                            </label>
                            <div className='input-group'>
                                <span className='input-group-text'>
                                    <i className='bi bi-person-fill text-success'></i>
                                </span>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='fullName'
                                    name='fullName'
                                    placeholder='Nhập họ tên'
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.fullName && (
                                <small className='text-danger'>
                                    {errors.fullName}
                                </small>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                                Email
                            </label>
                            <div className='input-group'>
                                <span className='input-group-text'>
                                    <i className='bi bi-envelope-fill text-success'></i>
                                </span>
                                <input
                                    className='form-control'
                                    id='email'
                                    name='email'
                                    placeholder='Nhập email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.email && (
                                <small className='text-danger'>
                                    {errors.email}
                                </small>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>
                                Mật khẩu
                            </label>
                            <div className='input-group'>
                                <span className='input-group-text'>
                                    <i className='bi bi-shield-lock-fill text-success'></i>
                                </span>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='password'
                                    name='password'
                                    placeholder='Nhập mật khẩu'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.password && (
                                <small className='text-danger'>
                                    {errors.password}
                                </small>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label
                                htmlFor='confirmPassword'
                                className='form-label'
                            >
                                Xác nhận mật khẩu
                            </label>
                            <div className='input-group'>
                                <span className='input-group-text'>
                                    <i className='bi bi-shield-lock-fill text-success'></i>
                                </span>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    placeholder='Nhập lại mật khẩu'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.confirmPassword && (
                                <small className='text-danger'>
                                    {errors.confirmPassword}
                                </small>
                            )}
                        </div>

                        <div className='form-check mb-3'>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                id='terms'
                                name='termsAccepted'
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                            />
                            <label className='form-check-label' htmlFor='terms'>
                                Tôi đã đọc và đồng ý với{' '}
                                <a href='#'>Điều khoản dịch vụ</a> và{' '}
                                <a href='#'>Chính sách bảo mật</a> của TopCV
                            </label>
                            {errors.termsAccepted && (
                                <small className='text-danger'>
                                    {errors.termsAccepted}
                                </small>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Loại tài khoản</label>
                            <select
                                className='form-select'
                                name='accountType'
                                value={formData.accountType}
                                onChange={handleChange}
                            >
                                <option value='seekerjob'>
                                    Người tìm việc
                                </option>
                                <option value='employer'>Nhà tuyển dụng</option>
                            </select>
                        </div>

                        <button
                            type='submit'
                            className='btn btn-success w-100 mb-3'
                        >
                            Đăng ký
                        </button>

                        <p className='text-center mt-3'>Hoặc đăng nhập bằng</p>
                        <div className='d-flex justify-content-center gap-2'>
                            <button
                                type='button'
                                className='btn btn-danger d-flex align-items-center'
                            >
                                <i className='bi bi-google'></i> Google
                            </button>
                            <button
                                type='button'
                                className='btn btn-primary d-flex align-items-center'
                            >
                                <i className='bi bi-facebook'></i> Facebook
                            </button>
                            <button
                                type='button'
                                className='btn btn-info text-white d-flex align-items-center'
                            >
                                <i className='bi bi-linkedin'></i> LinkedIn
                            </button>
                        </div>
                    </form>
                </div>

                <div
                    className={`${styles['login_right']} col-md-5 d-none d-md-flex flex-column text-white`}
                >
                    <img
                        className={styles['img-fluid']}
                        src='https://static.topcv.vn/v4/image/auth/topcv_white.png'
                        alt=''
                    />
                    <h1>Tiếp lợi thế</h1>
                    <h3>Nối thành công</h3>
                    <p>
                        TopCV - Hệ sinh thái nhân sự tiên phong ứng dụng công
                        nghệ tại Việt Nam
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Sign;
