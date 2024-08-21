/* eslint react/prop-types: 0 */
import MainLogo from "../assets/MainLogo.png";
import { NavLink, useNavigate } from "react-router-dom";
const Login_Register_Template = ({children, soleLogin="false"})=>{
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate("/login");
    }
    return (
        <div className="shadow-2xl w-1/2 h-full rounded-l-lg bg-slate-200 flex flex-col items-center gap-6 p-8">
            <img src={MainLogo} className="w-1/3 h-1/3" alt="Company Logo" />
            <div className="flex-col w-2/3 items-center text-center text-xl">
                <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                <p>To keep connected with us please login with you personal info</p>
            </div>
            {children}
            {soleLogin==="true"?
            ""
            :<button type="input" onClick={handleClick} className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/4">Sign in</button>
            }
            {soleLogin==="true"?<NavLink to="/register" className="underline">Not registered yet?</NavLink>:""}
        </div>
    )
}

export default Login_Register_Template;
