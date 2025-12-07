import { useState } from 'react';
import { Routes , Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import CourseDetails from './pages/CourseDetails'
import {  AuthProvider } from './context/AuthContext'





function App() {
 const [sidebarOpen, setSidebarOpen] = useState(false);


 const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
 
  

  return (
    <>
     <AuthProvider>
    <div className="min-h-screen">
        <NavBar  onMenuClick={toggleSidebar}  />
      <div className="flex">
  

        <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
      
        <div className='w-full lg:ml-[300px] pt-[70px]'>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path= "/Courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        </div>
       
      </div>
    </div>
     </AuthProvider>
      
    </>
  );
}

export default App;
