import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const VerifyEmail = ()=>{
    
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const {verifyEmail} = useAuthStore();

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setData({
            ...data, [name]: value
        });
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(!data){
            console.log("Provide Data");
        }
        try{
            await verifyEmail(data);
            navigate('/login');
        }catch(error){
            console.log("Cannot send login details to backend", error);
        }
    }
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <form className="max-w-lg mx-auto shadow-lg p-6 rounded-lg flex justify-center items-center flex-col bg-slate-100" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold text-center inline-block w-96">AutoResQ</h1>
                <h3 className="text-center text-2xl text-center font-bold my-4 text-slate-700">You will receive a code to your email shortly</h3>
                <div className="mb-5 self-center min-w-80">
                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900">Code</label>
                    <input type="text" name="code" id="code" onChange={handleChange} className="min-w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="enter your code here" required />
                </div>
                <div className='flex flex-row gap-6 self-center'>
                    <div className="flex items-center mb-4">
                        <input id="role-option-1" type="radio" name="role" onChange={handleChange} value="user" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
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
                <div className='flex justify-around'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify Code</button>
                </div>
            </form>
        </div>
    )
}

export default VerifyEmail;