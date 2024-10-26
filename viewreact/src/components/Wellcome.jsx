import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BsChevronDown, BsSearch } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import '../styles/components/wellcome.css';

const Wellcome = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  return (
    <div
      className="container-fluid d-flex pt-3"
      style={{
        background: 'url("/assets/images/header-bg.png") no-repeat center center',
        backgroundSize: 'cover',
        minHeight: '400px',
      }}
    >
      <div className="container">
        <div className='m-auto text-center pb-3'>
          <h1 className='text-custom'>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.</h1>
          <span className='text-span-custom'>Tiếp cận 40,000+ tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam</span>
        </div>
        <div
          className="col d-flex justify-content-around align-items-center bg-white"
          style={{
            height: '60px',
            borderRadius: '20px',
          }}
        >
          <form className="col-8 mx-2">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Vị trí tuyển dụng, tên công ty"
              style={{ borderRadius: '20px' }}
            />
          </form>
          <div className="section d-flex align-items-center position-relative col-2">
            <div>
              <CiLocationOn />
            </div>
            <div className="select-container position-relative">
              <div
                className="form-control d-flex justify-content-between align-items-center border-0"
                onClick={() => setIsOpen(!isOpen)}
                style={{ minWidth: '200px', cursor: 'pointer' }}
              >
                <span>{selectedCity || "Tất cả tỉnh/thành phố"}</span>
                <BsChevronDown />
              </div>
              {isOpen && (
                <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: '1', width: '100%' }}>
                  {['Hà Nội', 'Hồ Chí Minh', 'Bình Dương'].map((city, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleCityChange(city)}
                      style={{ cursor: 'pointer' }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="btn btn-customer-gren ms-3 text-light" style={{ borderRadius: '20px' }}>
            <BsSearch />
            Tìm kiếm
          </button>
        </div>
        <div id="carouselExampleIndicators" className="carousel slide mt-4 p-3" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/assets/images/Banner 1.png" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/Concentrix_Banner.png" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/f88.png" className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
    </div>
  );
};

export default Wellcome;