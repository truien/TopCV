import Modal from 'react-modal';
import styles from './ConfirmModal.module.css'; 
Modal.setAppElement('#root');

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.customModal}
      overlayClassName={styles.customOverlay}
    >
      <div className={styles.modalContent}>
        <h3 className={styles.modalContentHeader}>Xác nhận</h3> 
        <p className={styles.modalContentText}>{message}</p> 
        <div className={styles.modalActions}>
          <button className={styles.btnCancel} onClick={onClose}>
            Hủy
          </button>
          <button className={styles.btnConfirm} onClick={onConfirm}>
            Đồng ý
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
