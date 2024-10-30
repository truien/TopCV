import { Link } from 'react-router-dom';
import logo from '@images/topcv-logo-10-year.png';
import './styles.css';

const Header = () => {
  const handleLogin = () => {

  };

  const handleRegister = () => {

  };
  return (

    <nav className="navbar navbar-expand-lg navbar-light px-3" role="navigation">
      <div className="container-fluid">
        <span className="navbar-brand">
          <img src={logo} alt="Logo" style={{ height: '72px' }} />
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link custom-text">Trang chủ</Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="nav-link custom-text">Tìm việc</Link>
            </li>
            <li className="nav-item">
              <Link to="/employers" className="nav-link custom-text">Nhà tuyển dụng</Link>
            </li>
            <li className="nav-item">
              <Link to="/create-cv" className="nav-link custom-text">Tạo CV</Link>
            </li>
            <li className="nav-item">
              <Link to="/resources" className="nav-link custom-text">Tài nguyên</Link>
            </li>
          </ul>
          <div className="d-flex me-3">
            <button onClick={handleLogin} className="btn btn-outline-custom me-2">Đăng nhập</button>
            <button onClick={handleRegister} className="btn btn-primary-custom">Đăng ký</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
