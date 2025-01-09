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
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function JobPostDetails() {
    const { id } = useParams();
    const [jobPost, setJobPost] = useState(null);
    const [activeSection, setActiveSection] = useState('');
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

    useEffect(() => {
        const handleScroll = () => {
            const sectionRefs = [
                { id: 'details', ref: detailsRef },
                { id: 'companyJobs', ref: companyJobsRef },
                { id: 'relatedJobs', ref: relatedJobsRef },
            ];

            // Lấy phần tử hiện tại trong viewport
            for (const section of sectionRefs) {
                const rect = section.ref.current.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                                src={jobPost.employer.avatar}
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
                                    <span className='ms-2'>
                                        {jobPost.salaryRange}
                                    </span>
                                </div>

                                {/* Địa điểm */}
                                <div className='d-flex align-items-center'>
                                    <FaMapMarkerAlt
                                        className={styles.jobCard_icon}
                                    />
                                    <span className='ms-2'>
                                        {jobPost.location}
                                    </span>
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
                                    Hạn nộp hồ sơ: {jobPost.applyDeadline}
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
                    <nav className=' navbar sticky-top mt-3 bg-body w-auto' >
                        <div >
                            <div
                                onClick={() => scrollToSection(detailsRef)}
                                className={`btn fw-bold me-3 ${
                                    activeSection === 'details'
                                        ? styles['activite']
                                        : ''
                                }`}
                            >
                                Chi tiết công việc
                            </div>
                            <div
                                onClick={() => scrollToSection(companyJobsRef)}
                                className={`btn fw-bold me-3 ${
                                    activeSection === 'companyJobs'
                                        ? styles['activite']
                                        : ''
                                }`}
                            >
                                Việc làm khác của công ty
                            </div>
                            <div
                                onClick={() => scrollToSection(relatedJobsRef)}
                                className={`btn fw-bold ${
                                    activeSection === 'relatedJobs'
                                        ? styles['activite']
                                        : ''
                                }`}
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
                                        {jobPost.fields &&
                                            Array.isArray(jobPost.fields) &&
                                            jobPost.fields.map(
                                                (field, index) => (
                                                    <button
                                                        key={index}
                                                        className='btn btn-outline-secondary btn-sm me-2'
                                                    >
                                                        {field}
                                                    </button>
                                                )
                                            )}
                                        {jobPost.employment &&
                                            Array.isArray(jobPost.employment) &&
                                            jobPost.employment.map(
                                                (employment, index) => (
                                                    <button
                                                        key={index}
                                                        className='btn btn-outline-secondary btn-sm me-2'
                                                    >
                                                        {employment}
                                                    </button>
                                                )
                                            )}
                                    </div>

                                    {/* Mô tả công việc */}
                                    <div className='my-4'>
                                        <h6 className='text-black fw-medium'>
                                            Mô tả công việc
                                        </h6>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    jobPost.jobDescription
                                                ),
                                            }}
                                        ></div>
                                    </div>

                                    {/* Yêu cầu ứng viên */}
                                    <div className='my-4'>
                                        <h6 className='text-black fw-medium'>
                                            Yêu cầu ứng viên
                                        </h6>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    jobPost.requirements
                                                ),
                                            }}
                                        ></div>
                                    </div>

                                    {/* Quyền lợi */}
                                    <div className='my-4'>
                                        <h6 className='text-black fw-medium'>
                                            Quyền lợi
                                        </h6>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    jobPost.interest
                                                ),
                                            }}
                                        ></div>
                                    </div>

                                    {/* Địa điểm làm việc */}
                                    <div className='my-4'>
                                        <h6 className='text-black fw-medium'>
                                            Địa điểm làm việc
                                        </h6>
                                        <div className='d-flex align-items-center'>
                                            <FaMapMarkerAlt className='me-2 text-success' />
                                            <p className='mb-0'>
                                                {jobPost.location}
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
                                            Hạn nộp hồ sơ:{' '}
                                            {jobPost.applyDeadline}
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
                                <h5 className={styles['title']}>
                                    Việc khác của công ty
                                </h5>
                                <p>Danh sách các việc khác...</p>
                                <div>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Officiis cum rem veritatis
                                    fugiat aliquid sapiente odio, error
                                    consequatur perspiciatis, optio iusto
                                    adipisci maxime reprehenderit aliquam
                                    assumenda autem! Doloremque, pariatur
                                    incidunt.
                                    <hr />
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Architecto perspiciatis
                                    qui pariatur laborum beatae, illo quibusdam
                                    a totam, necessitatibus inventore, quos
                                    tenetur! Recusandae unde nostrum
                                    consequuntur blanditiis quod nisi beatae.
                                    <hr />
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Architecto perspiciatis
                                    qui pariatur laborum beatae, illo quibusdam
                                    a totam, necessitatibus inventore, quos
                                    tenetur! Recusandae unde nostrum
                                    consequuntur blanditiis quod nisi beatae.
                                    <hr />
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Architecto perspiciatis
                                    qui pariatur laborum beatae, illo quibusdam
                                    a totam, necessitatibus inventore, quos
                                    tenetur! Recusandae unde nostrum
                                    consequuntur blanditiis quod nisi beatae.
                                    <hr />
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Architecto perspiciatis
                                    qui pariatur laborum beatae, illo quibusdam
                                    a totam, necessitatibus inventore, quos
                                    tenetur! Recusandae unde nostrum
                                    consequuntur blanditiis quod nisi beatae.
                                    <hr />
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Architecto perspiciatis
                                    qui pariatur laborum beatae, illo quibusdam
                                    a totam, necessitatibus inventore, quos
                                    tenetur! Recusandae unde nostrum
                                    consequuntur blanditiis quod nisi beatae.
                                    <hr />
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Architecto perspiciatis
                                    qui pariatur laborum beatae, illo quibusdam
                                    a totam, necessitatibus inventore, quos
                                    tenetur! Recusandae unde nostrum
                                    consequuntur blanditiis quod nisi beatae.
                                    <hr />
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Architecto perspiciatis
                                    qui pariatur laborum beatae, illo quibusdam
                                    a totam, necessitatibus inventore, quos
                                    tenetur! Recusandae unde nostrum
                                    consequuntur blanditiis quod nisi beatae.
                                    <hr />
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Architecto perspiciatis
                                    qui pariatur laborum beatae, illo quibusdam
                                    a totam, necessitatibus inventore, quos
                                    tenetur! Recusandae unde nostrum
                                    consequuntur blanditiis quod nisi beatae.
                                    <hr />
                                </div>
                            </section>

                            <section
                                ref={relatedJobsRef}
                                className={
                                    styles['boder_custum'] + ' section mt-3 p-3'
                                }
                            >
                                <h5 className={styles['title']}>
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
