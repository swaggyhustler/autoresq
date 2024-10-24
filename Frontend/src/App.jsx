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


// const App = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-1">
//         <HeroSection />
//         <Testimonials />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-600 p-4 text-white">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Breakdown Assistance</h1>
//         <div>
//           <a href="#services" className="mr-4">Services</a>
//           <a href="#testimonials" className="mr-4">Testimonials</a>
//           <a href="#contact" className="mr-4">Contact</a>
//         </div>
//       </div>
//     </nav>
//   );
// }

// const HeroSection = () => {
//   return (
//     <div className="bg-blue-600 text-white py-20 text-center">
//       <h2 className="text-4xl font-bold mb-4">Get Help When You Need It Most</h2>
//       <p className="text-lg mb-6">Reliable vehicle breakdown assistance at your fingertips.</p>
//       <a href="#contact" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold transition hover:bg-gray-200">
//         Request Assistance
//       </a>
//     </div>
//   );
// }

// const testimonialsData = [
//   {
//     name: 'John Doe',
//     message: 'Fantastic service! They arrived in no time and got me back on the road quickly.',
//   },
//   {
//     name: 'Jane Smith',
//     message: 'Highly recommend! The staff was friendly and very professional.',
//   },
//   {
//     name: 'Mark Johnson',
//     message: 'I was stranded for hours, but they came to my rescue quickly. Thank you!',
//   },
// ];

// const Testimonials = () => {
//   return (
//     <div className="bg-gray-100 py-20">
//       <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
//       <div className="container mx-auto flex flex-col items-center">
//         {testimonialsData.map((testimonial, index) => (
//           <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-md">
//             <p className="text-lg italic">{testimonial.message}</p>
//             <p className="text-right font-semibold mt-2">- {testimonial.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const Footer = () => {
//   return (
//     <footer className="bg-blue-600 text-white py-4">
//       <div className="container mx-auto text-center">
//         <p>&copy; 2024 Breakdown Assistance. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }

// export default App;
