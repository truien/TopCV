import { useState } from 'react';
import Tippy from '@tippyjs/react';
import JobDetailTooltip from '../../JobDetailTooltip/JobDetailTooltip.jsx';
import logo from '@images/topcv-logo-10-year.png';

const JobCard = ({ job, fetchJobDetail, JobDetailCache, index }) => {
    const [visible, setVisible] = useState(false);

    const handleTooltipVisibleChange = async (visible) => {
        if (visible && !JobDetailCache[job.id]) {
            await fetchJobDetail(job.id);
        }
        setVisible(visible);
    };

    const placement = (index + 1) % 3 === 1 ? 'right' : 'left';

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
                        <Tippy
                            delay={[200, 0]}
                            theme='light'
                            arrow
                            offset={placement === 'left' ? [0, 250] : [0, 0]}
                            interactive
                            placement={placement}
                            className='bg-transparent'
                            content={
                                JobDetailCache[job.id] ? (
                                    <JobDetailTooltip
                                        jobDetail={JobDetailCache[job.id]}
                                    />
                                ) : (
                                    <span>Đang tải...</span>
                                )
                            }
                            onShow={() => handleTooltipVisibleChange(true)}
                            onHide={() => handleTooltipVisibleChange(false)}
                        >
                            <h5 className='job-title text-truncate fs-5 fw-semibold'>
                                {job.jobTitle}
                            </h5>
                        </Tippy>
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
