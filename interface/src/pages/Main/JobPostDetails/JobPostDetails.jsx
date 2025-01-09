import { useRef, useState, useEffect } from 'react';
import { Header } from '@mainlayout';
import coverPhoto from '@images/company_cover.jpg';
import styles from './JobPostDetails.module.css';
import { TbBuildings } from 'react-icons/tb';
import {
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaBriefcase,
    FaRegCalendarAlt,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function JobPostDetails() {
    const { id } = useParams();
    const [jobPost, setJobPost] = useState(null);
    const detailsRef = useRef(null);
    const companyJobsRef = useRef(null);
    const relatedJobsRef = useRef(null);

    useEffect(() => {
        const fetchJobPostDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5224/api/JobPosts/${id}`
                );
                setJobPost(response.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu bài đăng công việc:', error);
            }
        };
        fetchJobPostDetails();
    }, [id]);

    if (!jobPost) {
        return (
            <div className='text-center mt-5'>
                <p>Đang tải thông tin...</p>
                <div className='spinner-border' role='status'>
                    {/* <span className='sr-only'>Loading...</span> */}
                </div>
            </div>
        );
    }

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <>
            <Header />
            <div className={styles['bg_customer'] + ' p-3'}>
                <div className={' container '}>
                    <section
                        className={
                            styles['bg_company'] +
                            '  company_info position-relative rounded'
                        }
                    >
                        <div className='coverphoto '>
                            <img
                                src={coverPhoto}
                                alt='Logo'
                                className=' w-100 '
                            />
                        </div>
                        <div
                            className={
                                styles['top'] +
                                ' logo position-absolute start-0 ms-5 '
                            }
                        >
                            <img
                                src= {jobPost.employer.avatar}
                                alt='Logo'
                                className={styles['logo'] + ' rounded-circle'}
                            />
                        </div>
                        <div className='d-flex p-5 ms-5 justify-content-between '>
                            <div
                                className={
                                    styles['ps_6'] +
                                    ' copany_name text-light ms-5 d-block'
                                }
                            >
                                <span className='fs-4'>
                                    {jobPost.employer.companyName}
                                </span>
                                <div className='d-flex align-content-center'>
                                    <TbBuildings
                                        style={{
                                            fontSize: '20px',
                                        }}
                                        className='me-2'
                                    />
                                    20-24 nhân viên
                                </div>
                            </div>
                            <div className='folow'>
                                <div className='btn btn-outline-light'>
                                    + Theo dõi công ty
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className={`card mt-3 ${styles.jobCard}`}>
                        <div className='card-body'>
                            <h5 className={`${styles.jobCard_card_title}`}>
                                {jobPost.title}
                            </h5>

                            {/* Thông tin chi tiết */}
                            <div className='d-flex justify-content-between align-items-center my-3'>
                                {/* Mức lương */}
                                <div className='d-flex align-items-center'>
                                    <FaMoneyBillWave
                                        className={styles.jobCard_icon}
                                    />
                                    <span className='ms-2'>{jobPost.salaryRange}</span>
                                </div>

                                {/* Địa điểm */}
                                <div className='d-flex align-items-center'>
                                    <FaMapMarkerAlt
                                        className={styles.jobCard_icon}
                                    />
                                    <span className='ms-2'>Hồ Chí Minh</span>
                                </div>

                                {/* Kinh nghiệm */}
                                <div className='d-flex align-items-center'>
                                    <FaBriefcase
                                        className={styles.jobCard_icon}
                                    />
                                    <span className='ms-2'>
                                        Không yêu cầu kinh nghiệm
                                    </span>
                                </div>
                            </div>

                            {/* Hạn nộp hồ sơ */}
                            <div className='text-muted my-3 d-flex align-items-center'>
                                <FaRegCalendarAlt
                                    className={styles.jobCard_icon}
                                />
                                <span className='ms-2'>
                                    Hạn nộp hồ sơ: 03/02/2025
                                </span>
                            </div>

                            {/* Nút hành động */}
                            <div className='d-flex justify-content-start'>
                                <button className='btn btn-success me-3'>
                                    <FaRegCalendarAlt className='me-2' />
                                    Ứng tuyển ngay
                                </button>
                                <button className='btn btn-outline-success'>
                                    <FaRegCalendarAlt className='me-2' />
                                    Lưu tin
                                </button>
                            </div>
                        </div>
                    </div>
                    <nav className='navbar sticky-top mt-3 bg-light '>
                        <div>
                            <div
                                onClick={() => scrollToSection(detailsRef)}
                                className={
                                    styles['activite'] + ' btn fw-bold me-3'
                                }
                            >
                                Chi tiết công việc
                            </div>
                            <div
                                onClick={() => scrollToSection(companyJobsRef)}
                                className='btn  fw-bold me-3'
                            >
                                Việc làm khác của công ty
                            </div>
                            <div
                                onClick={() => scrollToSection(relatedJobsRef)}
                                className='btn  fw-bold'
                            >
                                Việc làm liên quan
                            </div>
                        </div>
                    </nav>
                    <div className='row'>
                        <div className='col-8'>
                            <section
                                ref={detailsRef}
                                className={
                                    styles['boder_custum'] + ' section mt-3'
                                }
                            >
                                <div
                                    className={`container ${styles.jobDetailsContainer}`}
                                >
                                    <h5 className={styles['title']}>
                                        Chi tiết tin tuyển dụng
                                    </h5>

                                    <div className='my-3'>
                                        <button className='btn btn-outline-secondary btn-sm me-2'>
                                            Chuyên môn Chăm sóc khách hàng
                                        </button>
                                        <button className='btn btn-outline-secondary btn-sm me-2'>
                                            Thương mại điện tử
                                        </button>
                                        <button className='btn btn-outline-secondary btn-sm me-2'>
                                            Marketing / Quảng cáo
                                        </button>
                                    </div>

                                    {/* Mô tả công việc */}
                                    <div className='my-4'>
                                        <h6 className='text-black fw-medium'>
                                            Mô tả công việc
                                        </h6>
                                        <p>
                                            - Tiếp nhận và giải đáp, tư vấn, hỗ
                                            trợ thông tin cho khách hàng thông
                                            qua các kênh liên lạc của công ty.
                                        </p>
                                        <p>
                                            - Tiếp cận và quản lý khối lượng dữ
                                            liệu, các vấn đề cần giải quyết của
                                            khách hàng và cung cấp thông tin từ
                                            các bộ phận liên quan xử lý.
                                        </p>
                                        <p>
                                            - Tìm hiểu nhu cầu của khách hàng,
                                            đưa ra giải pháp tốt nhất để hỗ trợ
                                            khách hàng về sản phẩm, dịch vụ, giá
                                            cả.
                                        </p>
                                        <p>
                                            - Quảng bá các chương trình khuyến
                                            mại, giới thiệu ưu đãi tới khách
                                            hàng.
                                        </p>
                                    </div>

                                    {/* Yêu cầu ứng viên */}
                                    <div className='my-4'>
                                        <h6 className='text-black fw-medium'>
                                            Yêu cầu ứng viên
                                        </h6>
                                        <p>
                                            <strong>- Yêu cầu đặc biệt:</strong>{' '}
                                            Tiếng Trung giao tiếp ổn
                                        </p>
                                        <p>
                                            - Làm ca đêm cố định 23:00-07:00 (8
                                            tiếng/ca), làm việc 6 ngày trong 1
                                            tuần, tùy chọn ngày off
                                        </p>
                                        <p>- Biết sử dụng máy tính cơ bản</p>
                                        <p>
                                            - Không cần kinh nghiệm sẽ có nhân
                                            viên tận tình hướng dẫn đào tạo.
                                        </p>
                                    </div>

                                    {/* Quyền lợi */}
                                    <div className='my-4'>
                                        <h6 className='text-black fw-medium'>
                                            Quyền lợi
                                        </h6>
                                        <ul>
                                            <li>
                                                Doanh thu trung bình mỗi tháng:
                                                15.000.000 - 25.000.000 VNĐ
                                            </li>
                                            <li>
                                                Lương cứng 15 triệu + % hoa hồng
                                            </li>
                                            <li>
                                                Được hỗ trợ BHXH / BHYT / BHTN
                                                theo quy định nhà nước
                                            </li>
                                            <li>
                                                Môi trường làm việc chuyên
                                                nghiệp, thoải mái, hỗ trợ tốt,
                                                chịu áp lực
                                            </li>
                                            <li>
                                                Thưởng Tết, lễ 1x lương tháng
                                                13...
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Thiết bị làm việc */}
                                    <div className='my-4'>
                                        <h6 className='text-black fw-medium'>
                                            Thiết bị làm việc
                                        </h6>
                                        <p>- Được cấp máy tính, tai nghe</p>
                                    </div>

                                    {/* Địa điểm làm việc */}
                                    <div className='my-4'>
                                        <h6 className='text-black fw-medium'>
                                            Địa điểm làm việc
                                        </h6>
                                        <div className='d-flex align-items-center'>
                                            <FaMapMarkerAlt className='me-2 text-success' />
                                            <p className='mb-0'>
                                                Hồ Chí Minh: 1487 Nguyễn Văn
                                                Linh, Phường Tân Phong, Quận 7
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hạn nộp hồ sơ */}
                                    <div className='my-4'>
                                        <h6 className='text-black fw-medium'>
                                            Cách thức ứng tuyển
                                        </h6>
                                        <p>
                                            - Ứng viên vui lòng nộp hồ sơ trực
                                            tiếp tại phần ứng tuyển ngay dưới
                                            đây.
                                        </p>
                                        <p className='text-muted d-flex align-items-center'>
                                            <FaRegCalendarAlt className='me-2' />{' '}
                                            Hạn nộp hồ sơ: 03/02/2025
                                        </p>
                                    </div>

                                    {/* Nút hành động */}
                                    <div className='my-4 d-flex '>
                                        <button
                                            className={
                                                styles[
                                                    'jobDetailsContainer_btn'
                                                ] + ' btn btn-success me-3'
                                            }
                                        >
                                            Ứng tuyển ngay
                                        </button>
                                        <button
                                            className={
                                                styles[
                                                    'jobDetailsContainer_btn'
                                                ] + ' btn btn-outline-success'
                                            }
                                        >
                                            Lưu tin
                                        </button>
                                    </div>
                                </div>
                            </section>

                            <section
                                ref={companyJobsRef}
                                className={
                                    styles['boder_custum'] + ' section mt-3 p-3'
                                }
                            >
                                <h5 className='fw-bolder'>
                                    Việc khác của công ty
                                </h5>
                                <p>Danh sách các việc khác...</p>
                            </section>

                            <section
                                ref={relatedJobsRef}
                                className={
                                    styles['boder_custum'] + ' section mt-3 p-3'
                                }
                            >
                                <h5 className='fw-bolder'>
                                    Việc làm liên quan
                                </h5>
                                <p>Danh sách các việc làm liên quan...</p>
                            </section>
                        </div>
                        <div className='col-4 mt-3'>
                            <div className='bg-light'>svsbd</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default JobPostDetails;
