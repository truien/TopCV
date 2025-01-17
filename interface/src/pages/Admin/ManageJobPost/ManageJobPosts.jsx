import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ManageJobPosts.module.css';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import EditJobPostForm from '@components/EditJobPostForm/EditJobPostForm.jsx';
import ConfirmModal from '@components/ConfirmModal/ConfirmModal.jsx';
import {
    AiOutlineDelete,
    AiOutlineEyeInvisible,
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlineEye,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

function ManageJobPosts() {
    const [jobPosts, setJobPosts] = useState([]);
    const [unapprovedPosts, setUnapprovedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postIdToApprove, setPostIdToApprove] = useState(null);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = (postId) => {
        document.getElementById('root').setAttribute('inert', 'true');
        setPostIdToDelete(postId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        document.getElementById('root').removeAttribute('inert');
        setIsDeleteModalOpen(false);
        setPostIdToDelete(null);
    };

    const openModal = (postId) => {
        document.getElementById('root').setAttribute('inert', 'true');
        setPostIdToApprove(postId);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        document.getElementById('root').removeAttribute('inert');
        setIsModalOpen(false);
        setPostIdToApprove(null);
    };

    const onEditPost = (Id) => {
        setIsEditing(true);
        setCurrentPostId(Id);
    };
    const onSavePost = () => {
        onCancelEdit();
        fetchData();
    };
    useEffect(() => {
        fetchData();
        fetchUnapprovedPosts();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'http://localhost:5224/api/JobPosts/get-all-jobpost'
            );
            setJobPosts(response.data);
        } catch (error) {
            toast.error('Đã xảy ra lỗi');
            console.log('Đã xảy ra lỗi', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUnapprovedPosts = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5224/api/JobPosts/get-all-jobpost?status=3'
            );
            setUnapprovedPosts(response.data);
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi tải bài chưa phê duyệt');
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const deletePromise = axios.delete(
                `http://localhost:5224/api/JobPosts/delete-jobpost/${postIdToDelete}`
            );

            toast.promise(deletePromise, {
                pending: 'Đang xóa bài đăng...',
                success: 'Xóa bài đăng thành công!',
                error: 'Đã xảy ra lỗi khi xóa bài đăng',
            });

            await deletePromise;

            setJobPosts((prevPosts) =>
                prevPosts.filter((post) => post.id !== postIdToDelete)
            );
            setUnapprovedPosts((prevPosts) =>
                prevPosts.filter((post) => post.id !== postIdToDelete)
            );

            closeDeleteModal();
        } catch (error) {
            console.error(error);
        }
    };
    const handleApprove = async () => {
        try {
            await axios.put(
                `http://localhost:5224/api/JobPosts/update-jobpost-status/${postIdToApprove}`,
                1,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setUnapprovedPosts((prevPosts) =>
                prevPosts.filter((post) => post.id !== postIdToApprove)
            );
            fetchData();
            closeModal();
        } catch (error) {
            console.error('Đã xảy ra lỗi khi phê duyệt bài đăng', error);
            alert('Không thể phê duyệt bài đăng. Vui lòng thử lại sau.');
        }
    };
    const handleToggleStatus = async (postId, currentStatus) => {
        try {
            const newStatus = currentStatus === 1 ? 2 : 1;

            // Gọi API để cập nhật trạng thái
            await axios.put(
                `http://localhost:5224/api/JobPosts/update-jobpost-status/${postId}`,
                newStatus,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setJobPosts(
                jobPosts.map((post) =>
                    post.id === postId ? { ...post, status: newStatus } : post
                )
            );
        } catch (ex) {
            console.log(ex);
        }
    };
    const onCancelEdit = () => {
        setIsEditing(false);
        setCurrentPostId(null);
    };

    return (
        <>
            <div>
                {!isEditing ? (
                    <div>
                        <h1 className={styles['title'] + ' mb-5 mt-3'}>
                            Quản lý bài đăng
                        </h1>
                        <p>
                            <a
                                className={styles['btn-custom'] + ' btn me-5'}
                                data-bs-toggle='collapse'
                                href='#postJobList'
                                role='button'
                                aria-expanded='false'
                                aria-controls='postJobList'
                            >
                                Bài đăng
                            </a>
                            <button
                                className={
                                    styles['btn-custom'] +
                                    ' btn position-relative'
                                }
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#approveJob'
                                aria-expanded='false'
                                aria-controls='approveJob'
                            >
                                Chưa phê duyệt
                                <div className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                    {unapprovedPosts.length || 0}
                                </div>
                            </button>
                        </p>
                        <div id='accordionExample'>
                            <div
                                className='collapse'
                                id='postJobList'
                                data-bs-parent='#accordionExample'
                            >
                                <div className='card card-body'>
                                    <div className='container-custome'>
                                        <div className='col'>
                                            {loading ? (
                                                <p>Đang tải dữ liệu...</p>
                                            ) : jobPosts.length > 0 ? (
                                                <div className='card card-body'>
                                                    <table className='table'>
                                                        <thead>
                                                            <tr>
                                                                <th scope='col'>
                                                                    Id
                                                                </th>
                                                                <th scope='col'>
                                                                    Tên công
                                                                    việc
                                                                </th>
                                                                <th scope='col'>
                                                                    Tên công ty
                                                                </th>
                                                                <th scope='col'>
                                                                    Mô tả
                                                                    côngviệc
                                                                </th>
                                                                <th scope='col'>
                                                                    Ngày đăng
                                                                </th>
                                                                <th scope='col'>
                                                                    Đăng bởi
                                                                </th>
                                                                <th scope='col'>
                                                                    Hành động
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {jobPosts.map(
                                                                (jobPost) => (
                                                                    <tr
                                                                        key={
                                                                            jobPost.id
                                                                        }
                                                                    >
                                                                        <td>
                                                                            {' '}
                                                                            {
                                                                                jobPost.id
                                                                            }{' '}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                jobPost.title
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                jobPost.companyName
                                                                            }
                                                                        </td>
                                                                        <td
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: DOMPurify.sanitize(
                                                                                    jobPost.jobDescription
                                                                                ),
                                                                            }}
                                                                        ></td>
                                                                        <td>
                                                                            {new Date(
                                                                                jobPost.postDate
                                                                            ).toLocaleDateString()}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                jobPost.userName
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <div className='d-flex'>
                                                                                <button
                                                                                    className='btn btn-danger me-1'
                                                                                    onClick={() =>
                                                                                        openDeleteModal(
                                                                                            jobPost.id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <AiOutlineDelete />
                                                                                </button>
                                                                                {jobPost.status ===
                                                                                1 ? (
                                                                                    <button
                                                                                        className='btn btn-warning'
                                                                                        onClick={() =>
                                                                                            handleToggleStatus(
                                                                                                jobPost.id,
                                                                                                jobPost.status
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <AiOutlineEyeInvisible />
                                                                                    </button>
                                                                                ) : (
                                                                                    <button
                                                                                        className='btn btn-secondary'
                                                                                        onClick={() =>
                                                                                            handleToggleStatus(
                                                                                                jobPost.id,
                                                                                                jobPost.status
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <AiOutlineEye />
                                                                                    </button>
                                                                                )}
                                                                                <div
                                                                                    className='btn-group'
                                                                                    role='group'
                                                                                >
                                                                                    <button
                                                                                        type='button'
                                                                                        className='btn btn-primary dropdown-toggle'
                                                                                        data-bs-toggle='dropdown'
                                                                                        aria-expanded='false'
                                                                                    ></button>
                                                                                    <ul className='dropdown-menu'>
                                                                                        <li>
                                                                                            <button
                                                                                                className='dropdown-item'
                                                                                                onClick={() =>
                                                                                                    onEditPost(
                                                                                                        jobPost.id
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                Sửa
                                                                                                bài
                                                                                                viết
                                                                                            </button>
                                                                                        </li>
                                                                                        <li>
                                                                                            <Link
                                                                                            to = '/admin/managecatery'
                                                                                                className= 'btn dropdown-item'
                                                                                                // onClick={onEditCategory}
                                                                                            >
                                                                                                Quản lý danh mục
                                                                                            </Link>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <p>
                                                    Không có dữ liệu Nhà tuyển
                                                    dụng.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='collapse'
                                id='approveJob'
                                data-bs-parent='#accordionExample'
                            >
                                <div className='card card-body'>
                                    <h5>Bài đăng chưa phê duyệt</h5>
                                    {unapprovedPosts.length > 0 ? (
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>Id</th>
                                                    <th scope='col'>
                                                        Tên công việc
                                                    </th>
                                                    <th scope='col'>
                                                        Tên công ty
                                                    </th>
                                                    <th scope='col'>
                                                        Ngày đăng
                                                    </th>
                                                    <th scope='col'>
                                                        Đăng bởi
                                                    </th>
                                                    <th scope='col'>
                                                        Hành động
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {unapprovedPosts.map(
                                                    (jobPost) => (
                                                        <tr key={jobPost.id}>
                                                            <td>
                                                                {jobPost.id}
                                                            </td>
                                                            <td>
                                                                {jobPost.title}
                                                            </td>
                                                            <td>
                                                                {
                                                                    jobPost.companyName
                                                                }
                                                            </td>
                                                            <td>
                                                                {new Date(
                                                                    jobPost.postDate
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td>
                                                                {
                                                                    jobPost.userName
                                                                }
                                                            </td>
                                                            <td>
                                                                <div className='d-flex'>
                                                                    <button
                                                                        className='btn btn-success me-1'
                                                                        onClick={() =>
                                                                            openModal(
                                                                                jobPost.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <AiOutlineCheckCircle />
                                                                    </button>
                                                                    <button
                                                                        className='btn btn-danger'
                                                                        onClick={() =>
                                                                            openDeleteModal(
                                                                                jobPost.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <AiOutlineCloseCircle />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Không có bài đăng cần phê duyệt.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <EditJobPostForm
                        idPost={currentPostId}
                        onSave={onSavePost}
                        onCancel={onCancelEdit}
                    />
                )}
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleApprove}
                message='Bạn muốn phê duyệt bài đăng này?'
            />
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                message='Bạn có chắc chắn muốn xoá bài đăng này?'
            />
        </>
    );
}

export default ManageJobPosts;
