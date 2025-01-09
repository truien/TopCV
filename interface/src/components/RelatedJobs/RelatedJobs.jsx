import React from 'react';
import styles from './JobCard.module.css';

function RelatedJobs({ job }) {
    const calculateDaysLeft = (deadline) => {
        const today = new Date(); // Ngày hiện tại
        const deadlineDate = new Date(deadline); // Chuyển đổi deadline thành kiểu Date
        const timeDiff = deadlineDate - today; // Tính khoảng cách thời gian (milliseconds)
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Chuyển đổi sang số ngày

        if (daysDiff > 0) {
            return { type: 'remaining', days: daysDiff }; // Còn ngày
        } else {
            return { type: 'overdue', days: Math.abs(daysDiff) }; // Quá hạn
        }
    };
    const daysInfo = calculateDaysLeft(job.applyDeadline);
    return (
        <div className={`d-flex align-items-center ${styles.jobCard}`}>
            {/* Logo */}
            <img src={job.logo} alt='Logo' className={styles.logo} />

            {/* Nội dung */}
            <div className='ms-3 flex-grow-1'>
                <h5 className={`mb-2 ${styles.jobTitle}`}>{job.title}</h5>
                <p className='mb-1 text-muted'>{job.company}</p>
                <div className='d-flex flex-wrap align-items-center mb-2'>
                    <span className='badge bg-light text-dark me-2'>
                        {job.location}
                    </span>
                    <span className='badge bg-light text-dark me-2'>
                        {job.applyDeadline
                            ? daysInfo.type === 'remaining'
                                ? `Còn ${daysInfo.days} ngày để ứng tuyển`
                                : `Đã quá ${daysInfo.days} ngày`
                            : 'Hạn ứng tuyển chưa được đặt'}
                    </span>
                    <span className='badge bg-light text-dark'>
                        Cập nhật {job.postDate}
                    </span>
                </div>
            </div>

            {/* Mức lương */}
            <div className='text-end'>
                <p className={`mb-2 ${styles.salary}`}>{job.salary}</p>
                <button className='btn btn-success btn-sm me-2'>
                    Ứng tuyển
                </button>
                <button className='btn btn-outline-success btn-sm'>Lưu</button>
            </div>
        </div>
    );
}

export default RelatedJobs;
