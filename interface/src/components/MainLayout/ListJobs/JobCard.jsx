import { useState } from 'react';
import Tooltip from 'rc-tooltip'; // Import rc-tooltip
import 'rc-tooltip/assets/bootstrap.css'; // Import style của rc-tooltip
import logo from '@images/topcv-logo-10-year.png';

const JobCard = ({ job, onMouseOver, onMouseOut }) => {
    const [visible, setVisible] = useState(false); // Để kiểm soát sự hiển thị của tooltip

    const handleTooltipVisibleChange = (visible) => {
        setVisible(visible);
    };

    return (
        <div className='col-4 mb-4'>
            <div className='card job-card shadow-sm'>
                <div className='card-body d-flex'>
                    <div className='company-logo me-3'>
                        <img
                            src={job.avatar || logo}
                            alt='Company Logo'
                            style={{
                                width: '70px',
                                height: '70px',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                    <div
                        className='job-info flex-grow-1'
                        style={{
                            maxWidth: 'calc(100% - 80px)',
                            overflow: 'hidden',
                        }}
                    >
                        <Tooltip
                            visible={visible} // Hiển thị tooltip khi cần
                            onVisibleChange={handleTooltipVisibleChange} // Cập nhật sự thay đổi của visibility
                            placement='right'
                            overlay={<div>{job.jobTitle}</div>} // Nội dung của tooltip
                        >
                            <h5
                                className='job-title text-truncate fs-5 fw-semibold'
                                onMouseEnter={() => onMouseOver(job.id)}
                                onMouseLeave={onMouseOut}
                                onFocus={() => onMouseOver(job.id)}
                                onBlur={onMouseOut}
                            >
                                {job.jobTitle}
                            </h5>
                        </Tooltip>
                        <p className='company-name text-truncate fs-6 fw-medium'>
                            {job.company}
                        </p>
                        <div className='d-flex align-items-end'>
                            <span className='job-salary text-muted me-3'>
                                {job.salary}
                            </span>
                            <span className='job-location text-muted'>
                                {job.location}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
