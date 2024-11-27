import DOMPurify from 'dompurify';
import styles from './JobDetailTooltip.module.css';

const JobDetailTooltip = ({ jobDetail }) => {
    if (!jobDetail) return null;

    const sanitizeHTML = (html) => {
        return { __html: DOMPurify.sanitize(html) };
    };

    return (
        <div>
            <div className={styles['job-detail-tooltip']}>
                <h5 className={styles['job-detail-tooltip__h5']}>
                    {jobDetail.title}
                </h5>
                <p className={styles['job-detail-tooltip__p']}>
                    <strong>Địa điểm:</strong> {jobDetail.location}
                </p>
                <p className={styles['job-detail-tooltip__p']}>
                    <strong>Mức lương:</strong> {jobDetail.salaryRange}
                </p>
                <p className={styles['job-detail-tooltip__p']}>
                    <strong>Ngày đăng:</strong> {jobDetail.postDate}
                </p>

                <div>
                    <h5 className={styles['job-detail-tooltip__h5']}>
                        Mô tả công việc:
                    </h5>
                    <div
                        dangerouslySetInnerHTML={sanitizeHTML(
                            jobDetail.jobDescription
                        )}
                    />
                </div>

                <div>
                    <h5 className={styles['job-detail-tooltip__h5']}>
                        Yêu cầu công việc:
                    </h5>
                    <div
                        dangerouslySetInnerHTML={sanitizeHTML(
                            jobDetail.requirements
                        )}
                    />
                </div>

                <div>
                    <h5 className={styles['job-detail-tooltip__h5']}>
                        Quyền lợi:
                    </h5>
                    <div
                        dangerouslySetInnerHTML={sanitizeHTML(
                            jobDetail.interest
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default JobDetailTooltip;
