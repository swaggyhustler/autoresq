import Login_Register_Template from "../componets/Login_Register_Template.jsx";
import InputField from "../componets/InputField.jsx";
import {useContext} from "react";
import GlobalContext from "../contexts/GlobalContext.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const Login=()=>{
    const {loginData} = useContext(GlobalContext); 
    const navigate=useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();  
        try{
            const res = await axios.post("http://localhost:3000/api/auth/login", loginData);
            if(res.data.userAuthorized){
                navigate("/home");
            }else{
                navigate("/login");
            }
        }catch(error){
            console.log("E: Something went wrong, \n", error);
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
                            <button type="submit" className="self-center bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/3">Sign in</button>
                        </form>
                    </Login_Register_Template>
            </div>
        </div>
    )
}

export default Login;