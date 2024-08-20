import LoginForm from "../componets/Login_Register_Template";
import InputField from "../componets/InputField.jsx";
const Register=()=>{
    const LogoButtons="rounded-full border-2 border-black h-12 w-12 flex justify-center items-center hover:bg-slate-300 cursor-pointer";
    return (
        <div className='bg-cover bg-center h-screen flex justify-center items-center'>
            <div className="container w-2/3 h-2/3 flex">
                <LoginForm ButtonMessage="Sign in"/>
                <div className="shadow-2xl w-1/2 h-full bg-white flex flex-col justify-center rounded-r-lg items-center gap-6">
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
                    <form className="max-w-md mx-auto">
                        <InputField name="name">
                            <i className="fa-regular fa-user mr-2"></i>
                            Name
                        </InputField>
                        <InputField name="email">
                            <i className="fa-regular fa-envelope mr-2"></i> 
                            Email Address
                        </InputField>
                        <InputField name="password">
                            <i className="fa-solid fa-lock mr-2"></i> 
                            Password
                        </InputField>
                    </form>
                    <button type="button" className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/4">Sign up</button>
                </div>
            </div>
        </div>
    )
}
export default Register;