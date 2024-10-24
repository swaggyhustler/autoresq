import LoginForm from "../componets/Login_Register_Template";
import InputField from "../componets/InputField.jsx";
import  {useState, useContext} from "react";
import GlobalContext from "../contexts/GlobalContext.jsx";
import ReactLoading from "react-loading";
import { useAuthStore } from "../stores/authStore.js";
import { useNavigate } from "react-router-dom";

const Register=()=>{
    // const [loading, setLoading]=useState(false);
    const {registerData, setRegisterData}=useContext(GlobalContext);
    const [registerMechanic, setRegisterMechanic] = useState(true);
    const {signupUser, signupMechanic, loading} = useAuthStore();
    const navigate = useNavigate();
    // const delay=(ms)=>{
    //     return new Promise(resolve=>setTimeout(resolve, ms));
    // }
    const handleSubmit= (e)=>{
        e.preventDefault();
        try{
            if(registerData.role === 'user'){
                // axios.post("http://localhost:3000/api/auth/register/user", registerData)
                // .then(setLoading(true))
                // .then(navigate("/login"));
                signupUser(registerData);
                return navigate('/verify-email');
            }
            if(registerData.role === 'mechanic'){
                setRegisterMechanic(false);
            }
        }catch(error){
            console.log("E: Something went wrong, ",error.message);
        }
    }

    const handleMechSubmit = (e) => {
        e.preventDefault();
        // axios.post("http://localhost:3000/api/auth/register/mechanic", registerData)
        // .then(setLoading(false))
        // .then(navigate("/login"));
        signupMechanic(registerData);
        return navigate('/verify-email');
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setRegisterData({
            ...registerData, [name]: value
        });
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
                    {   registerMechanic ? 
                        <form className="max-w-md mx-auto flex flex-col" onSubmit={handleSubmit}>
                        <InputField name="name">
                            <i className="fa-regular fa-user mr-2"></i>
                            Name
                        </InputField>
                        <InputField name="phone">
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
                        <div className='flex flex-row gap-6 justify-center items-center'>
                            <div className="flex items-center mb-4">
                                <input id="role-option-1" type="radio" name="role" onChange={handleChange} value="user" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="role-option-1" className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                                User
                                </label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input id="role-option-2" type="radio" name="role" onChange={handleChange} value="mechanic" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"  />
                                <label htmlFor="role-option-2" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-900">
                                Mechanic
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="self-center bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/3">Sign up</button>
                    </form>:
                    <form className="max-w-md mx-auto flex flex-col" onSubmit={handleMechSubmit}>
                        <InputField name="garage_name">
                            <i className="fa-regular fa-user mr-2"></i>
                            Garage Name
                        </InputField>
                        <InputField name="coordinates">
                            <i className="fa-regular fa-user mr-2"></i>
                            Location Coordinates
                        </InputField>
                        <button type="submit" className="self-center bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/3">Sign up</button>
                    </form>
                    }
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