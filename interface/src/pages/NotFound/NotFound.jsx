import styles from './NotFound.module.scss';

const NotFound = () => {
    return (
        <div  className={styles.fist}>
            <h1 className={styles.number}>404</h1>
            <p className={styles.text}>
                <span>Oops...</span> Page Not Found
            </p>
            <a href='/' className={styles.link}>
                Go Back to Home
            </a>
        </div>
    );
};

export default NotFound;
