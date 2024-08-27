import axios from 'axios';
import React from 'react';
const Admin=()=>{
    const [userData, setUserData]=React.useState(null);
    const handleOnChange=(e)=>{
        const {name, value}=e.target;
        setUserData({...userData, [name]: value});
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const result = await axios.get(`http://localhost:3000/admin/getUser/${userData.email}`);
        setUserData((prev)=>{
            return (
                {...prev, ...result.data.data}
            )
        });
    }
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-4 ">
            <h1 className='text-2xl font-bold'>Admin Page</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Email</label>
                        <input type="email" name="email" id="first_name" onChange={handleOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@mail.com" required />
                    </div>
                    <button type='submit' className='mt-3 bg-green-600 p-3 rounded-xl'>Submit</button>
                </form>
                {userData?
                <div>
                    {userData.name} {userData.mobile} {userData.email} {userData.password}
                </div>:""}
            </div>
        </div>
    )
}

export default Admin;