import styles from './SearchJobCard.module.css';
import { CiHeart } from 'react-icons/ci';
import { TbCoinFilled } from 'react-icons/tb';
const SearchJobCard = ({ job }) => {
    if (!job) {
        return null;
    }
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
    const dayUpdate = Math.round(
        (-new Date(job.postDate).getTime() + new Date().getTime()) /
            (1000 * 60 * 60 * 24)
    );

    return (
        <>
            <div
                className={`d-flex align-items-center position-relative ${styles.jobCard}`}
            >
                <div className={styles.logo}>
                    <img
                        src={job.avatar}
                        alt='Logo'
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: ' 4px',
                            border: '1px solid #ddd',
                        }}
                    />
                </div>

                <div className='ms-3 flex-grow-1'>
                    <h5 className={`mb-2 ${styles.jobTitle}`}>{job.title}</h5>
                    <p
                        className='mb-3 text-muted'
                        style={{
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '20px',
                            color: '#424e5c',
                        }}
                    >
                        {job.companyName}
                    </p>
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
                            Cập nhật {dayUpdate} ngày trước
                        </span>
                    </div>
                </div>

                {/* Mức lương */}
                <div className=''>
                    <p
                        className={`mb-2 mt-3 me-1 position-absolute top-0 end-0 ${styles.salary}`}
                    >
                        <TbCoinFilled
                            style={{ height: '15px', width: '15px' }}
                        />{' '}
                        {job.salaryRange}
                    </p>
                    <div className='d-flex position-absolute bottom-0 end-0 mb-1 me-1'>
                        <button
                            className='btn btn-success btn-sm me-2'
                            style={{ fontSize: '12px' }}
                        >
                            Ứng tuyển
                        </button>
                        <button className='btn btn-outline-success btn-sm'>
                            <CiHeart />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchJobCard;
