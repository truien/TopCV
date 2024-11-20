import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import AdminLayout from '@layouts/AdminLayout';
import Home from './pages/Main/Home/Home.jsx';
import JobList from './pages/Main/JobList/JobList.jsx';
import Users from './pages/Admin/UserEmloyer/Users.jsx';
import ManageJobPosts from './pages/Admin/ManageJobPost/ManageJobPosts.jsx';
import Login from './components/Login/Login.jsx';
import Sign from './components/Sign/Sign.jsx';
import EmployerLayout from '@layouts/EmployerLayout';
import JobPostManage from './pages/Employer/JobPostManage/JobPostManage.jsx';
import CreateJobPost from './pages/Employer/CreateJobPost/CreateJobPost.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='job-post' element={<JobList />} />
                </Route>
                <Route path='/admin' element={<AdminLayout />}>
                    <Route index element={<Users />} />
                    <Route
                        path='job-post-manage'
                        element={<ManageJobPosts />}
                    />
                </Route>
                <Route path='/employer' element={<EmployerLayout />}>
                    <Route index element={<JobPostManage />} />
                    <Route path='createjobpost' element={<CreateJobPost />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/sign' element={<Sign />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
