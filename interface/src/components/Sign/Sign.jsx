import styles from './styles.module.css';
function Sign() {
    return (
        <>
            <div
                className=' d-flex justify-content-center align-items-center'
                style={{ minHeight: '100vh' }}
            >
                <div className='row w-100'>
                    <div className='col-md-7 container-fluid p-4 border rounded bg-white'>
                        <h4 className='text-success text-center'>
                            Chào mừng bạn đến với TopCV
                        </h4>
                        <p className='text-center'>
                            Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ
                            hội sự nghiệp lý tưởng
                        </p>
                        <form>
                            <div className='mb-3'>
                                <label
                                    htmlFor='fullName'
                                    className='form-label'
                                >
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
                                        placeholder='Nhập họ tên'
                                    />
                                </div>
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
                                        type='email'
                                        className='form-control'
                                        id='email'
                                        placeholder='Nhập email'
                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label
                                    htmlFor='password'
                                    className='form-label'
                                >
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
                                        placeholder='Nhập mật khẩu'
                                    />
                                </div>
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
                                        placeholder='Nhập lại mật khẩu'
                                    />
                                </div>
                            </div>

                            <div className='form-check mb-3'>
                                <input
                                    type='checkbox'
                                    className='form-check-input'
                                    id='terms'
                                />
                                <label
                                    className='form-check-label'
                                    htmlFor='terms'
                                >
                                    Tôi đã đọc và đồng ý với{' '}
                                    <a href='#'>Điều khoản dịch vụ</a> và{' '}
                                    <a href='#'>Chính sách bảo mật</a> của TopCV
                                </label>
                            </div>

                            <button
                                type='submit'
                                className='btn btn-success w-100 mb-3'
                            >
                                Đăng ký
                            </button>

                            <p className='text-center mt-3'>
                                Hoặc đăng nhập bằng
                            </p>
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
                        className={
                            styles['login_right'] +
                            '   col-md-5 d-none d-md-flex flex-column text-white'
                        }
                    >
                        <img
                            className={styles['img-fluid']}
                            src='https://static.topcv.vn/v4/image/auth/topcv_white.png'
                            alt=''
                        />
                        <h1>Tiếp lợi thế</h1>
                        <h3>Nối thành công</h3>
                        <p>
                            TopCV - Hệ sinh thái nhân sự tiên phong ứng dụng
                            công nghệ tại Việt Nam
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sign;
