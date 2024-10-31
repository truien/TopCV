import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import Adminlayout from '@layouts/AdminLayout';
import Home from './pages/Main/Home/Home.jsx';
import Joblist from './pages/Main/JobList/JobList.jsx';
import Users from './pages/Admin/UserEmloyer/Users.jsx';
import ManageJobPosts from './pages/Admin/ManageJobPost/ManageJobPosts.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='job-post' element={<Joblist />} />
                </Route>
                <Route path='/admin' element={<Adminlayout />}>
                    <Route index element={<Users />} />
                    <Route
                        path='job-post-manage'
                        element={<ManageJobPosts />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
