// Header.jsx
import React from 'react';
import '../styles/components/Header.css'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3">
      <div className="container-fluid">
        <span className="navbar-brand">
          <img src="/assets/images/topcv-logo-10-year.png" alt="Logo" style={{ height: '72px' }} /> 
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
          <ul className=" navbar-nav ">
            <li className="nav-item">
              <span className="custom-text nav-link">Trang chủ</span>
            </li>
            <li className="nav-item">
              <span className="nav-link custom-text">Tìm việc</span>
            </li>
            <li className="nav-item">
              <span className="nav-link custom-text">Nhà tuyển dụng</span>
            </li>
            <li className="nav-item">
              <span className="nav-link custom-text">Tạo CV</span>
            </li>
            <li className="nav-item">
              <span className="nav-link custom-text">Tài nguyên</span>
            </li>
          </ul>
          <div className="d-flex me-3">
            <span className="btn  btn-outline-custom me-2 ">Đăng nhập</span>
            <span className="btn btn-primary-custom ">Đăng ký</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
