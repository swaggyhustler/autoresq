import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import {useEffect} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import { useAuthStore } from "./stores/authStore.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Layout from "./componets/Layouts/Layout.jsx";
import Assistance from "./pages/Assistance"
import Mechanic from "./pages/Mechanic.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

const ProtectedRoutes = ({children})=>{
  const {isAuthenticated, user} = useAuthStore();
  if(!isAuthenticated){
    return <Navigate to='/' replace/>;
  }
  if(!user.isVerified){
    return <Navigate to='/verify-email' replace/>;
  }
  return children;
}

const App=()=>{
  const {checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);
  
  return(
    <>
      <ToastContainer position='top-center' autoClose={2000} /> 
      <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/assistance" element={
          <ProtectedRoutes>
            <Assistance />
          </ProtectedRoutes>
        } />
        <Route path="/mechanic" element={
          <ProtectedRoutes>
            <Mechanic />
          </ProtectedRoutes>
        } />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      </Layout>
    </>
  );
}
export default App;