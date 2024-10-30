import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import Adminlayout from '@layouts/AdminLayout';
import Home from './pages/Main/Home/Home.jsx';
import Joblist from './pages/Main/JobList/JobList.jsx';
import UserEmployer from './pages/Admin/UserEmloyer/UserEmloyer.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> 
          <Route path="/job-post" element={<Joblist />} />
        </Route>
        <Route path="/admin" element={<Adminlayout />}>
        <Route index element={<UserEmployer />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;