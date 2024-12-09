import { useState } from 'react';
import Tooltip from 'rc-tooltip';
import JobDetailTooltip from '@components/JobDetailTooltip/JobDetailTooltip.jsx';
import logo from '@images/topcv-logo-10-year.png';

const JobCard = ({ job, jobDetail }) => {
    const [visible, setVisible] = useState(false);
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
                            placement='right'
                            overlay={<JobDetailTooltip jobDetail={jobDetail} />}
                        >
                            <h5 className='job-title text-truncate fs-5 fw-semibold'>
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
