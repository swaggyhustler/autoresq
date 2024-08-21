import LoginForm from "../componets/Login_Register_Template";
import InputField from "../componets/InputField.jsx";
import  {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext} from "react";
import GlobalContext from "../contexts/GlobalContext.jsx";
import ReactLoading from "react-loading";
const Register=()=>{
    const [loading, setLoading]=useState(false);
    const {registerData}=useContext(GlobalContext);
    const navigate=useNavigate();
    // const delay=(ms)=>{
    //     return new Promise(resolve=>setTimeout(resolve, ms));
    // }
    const handleSubmit= (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            axios.post("http://localhost:3000/api/auth/register", registerData)
            .then(setLoading(false))
            .then(navigate("/login"));
        }catch(error){
            setLoading(false);
            console.log("E: Something went wrong, ",error.message);
        }
    }

    const LogoButtons="rounded-full border-2 border-black h-12 w-12 flex justify-center items-center hover:bg-slate-300 cursor-pointer";
    return (
        <div className='bg-cover bg-center h-screen flex justify-center items-center'>
            <div className="container w-2/3 h-2/3 flex">
                <LoginForm />
                {!loading?<div className="shadow-2xl w-1/2 h-full bg-white flex flex-col justify-center rounded-r-lg items-center gap-3">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <div className="flex justify-center items-center gap-3 ">
                        <div className={LogoButtons}>
                            <i className="fa-brands fa-meta p-2"></i>
                        </div>
                        <div className={LogoButtons}>
                            <i className="fa-brands fa-google"></i>
                        </div>
                        <div className={LogoButtons}>
                            <i className="fa-brands fa-github"></i>
                        </div>
                        <div className={LogoButtons}>
                            <i className="fa-brands fa-twitter"></i>
                        </div>
                    </div>
                    <p className="text-lg">or use your email for registration</p>
                    <form className="max-w-md mx-auto flex flex-col" onSubmit={handleSubmit}>
                        <InputField name="name">
                            <i className="fa-regular fa-user mr-2"></i>
                            Name
                        </InputField>
                        <InputField name="mobile">
                            <i className="fa-solid fa-phone mr-2"></i>
                            Mobile Number
                        </InputField>
                        <InputField name="email">
                            <i className="fa-regular fa-envelope mr-2"></i> 
                            Email Address
                        </InputField>
                        <InputField name="password">
                            <i className="fa-solid fa-lock mr-2"></i> 
                            Password
                        </InputField>
                        <button type="submit" className="self-center bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/3">Sign up</button>
                    </form>
                </div>:
                <div className="shadow-2xl w-1/2 h-full bg-white flex flex-col justify-center rounded-r-lg items-center gap-3">
                    <ReactLoading type="spin" color="black"/>
                </div>
                }
            </div>
        </div>
    )
}
export default Register;