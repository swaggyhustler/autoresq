import Login_Register_Template from "../componets/Login_Register_Template.jsx";
import InputField from "../componets/InputField.jsx";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext.jsx";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import {useAuthStore} from "../stores/authStore.js";
 
const Login=()=>{
    const navigate = useNavigate();
    const {loginData, setLoginData} = useContext(GlobalContext); 
    // const [logError, setLogError]=useState(null);
    const {login} = useAuthStore();
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setLoginData({
            ...loginData, [name]: value
        });
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();  
        try{
            await login(loginData);
            navigate('/home');
        }catch(error){
            console.log("Cannot send details to backend", error.message);
        }
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="h-3/2 w-2/3 flex items-center justify-center">
                    <Login_Register_Template ButtonMessage="Sign in" soleLogin="true">
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <InputField name="email" form="login">
                                <i className="fa-regular fa-user mr-2"></i>
                                Name
                            </InputField>
                            <InputField name="password" form="login">
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
                            <button type="submit" className="self-center bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/3">Sign in</button>
                        </form>
                        {/* {logError?<p className="text-red-900">{logError}</p>:''} */}
                    </Login_Register_Template>
            </div>
        </div>
    )
}

export default Login;