/* eslint react/prop-types: 0 */
import {useContext} from "react";
import GlobalContext from "../contexts/GlobalContext.jsx";
const InputField=(props)=>{
    const {loginData, setLoginData, registerData, setRegisterData}=useContext(GlobalContext);
    if(props.form==="login"){
        const handleChange=(e)=>{
            const {name, value}=e.target;
            setLoginData({...loginData, [name]: value});
        }
        return (
            <div className="relative z-0 w-72 mb-5 group">
                <input type="text" name={props.name} onChange={handleChange} id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> {props.children} {props.LabelText}</label>
            </div>
        )
    }else{
        const handleChange=(e)=>{
            const {name, value}=e.target;
            setRegisterData({...registerData, [name]: value});
        }
        return (
            <div className="relative z-0 w-72 mb-5 group">
                <input type="text" name={props.name} onChange={handleChange} id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> {props.children} {props.LabelText}</label>
            </div>
        )
    }
}

export default InputField;