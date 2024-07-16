import MainLogo from "../assets/MainLogo.png";
const Register=()=>{
    return (
        <div className='bg-register-abstract bg-cover bg-center h-screen flex justify-center items-center'>
            <div className="container w-2/3 h-2/3 flex">
                <div className="w-1/2 h-full  backdrop-blur-sm rounded-l-lg bg-white/30 flex flex-col items-center gap-6 p-8">
                    <img src={MainLogo} className="w-1/3 h-1/3" alt="Company Logo" />
                    <div className="flex-col w-2/3 items-center text-center text-xl">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                        <p>To keep connected with us please login with you personal info</p>
                    </div>
                    <button type="button" className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sign in</button>
                </div>
                <div className="w-1/2 h-full bg-white flex flex-col justify-center rounded-r-lg items-center gap-6">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <div className="flex justify-center items-center gap-3 ">
                        <div className="rounded-full border-2 border-black h-12 w-12 flex justify-center items-center hover:bg-slate-300 cursor-pointer">
                            <i className="fa-brands fa-meta p-2"></i>
                        </div>
                        <div className="rounded-full border-2 border-black h-12 w-12 flex justify-center items-center hover:bg-slate-300 cursor-pointer">
                            <i className="fa-brands fa-google"></i>
                        </div>
                        <div className="rounded-full border-2 border-black h-12 w-12 flex justify-center items-center hover:bg-slate-300 cursor-pointer">
                            <i className="fa-brands fa-github"></i>
                        </div>
                        <div className="rounded-full border-2 border-black h-12 w-12 flex justify-center items-center hover:bg-slate-300 cursor-pointer">
                            <i className="fa-brands fa-twitter"></i>
                        </div>
                    </div>
                    <p className="text-lg">or use your email for registration</p>
                    <form className="max-w-md mx-auto">
                        <div className="relative z-0 w-72 mb-5 group">
                            <input type="text" name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> <i className="fa-regular fa-user"></i> Name</label>
                        </div>
                        <div className="relative z-0 w-72 mb-5 group">
                            <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> <i className="fa-regular fa-envelope"></i> Email Address</label>
                        </div>
                        <div className="relative z-0 w-72 mb-5 group">
                            <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-lock"></i> Password</label>
                        </div>
                    </form>
                    <button type="button" className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sign up</button>
                </div>
            </div>
        </div>
    )
}
export default Register;