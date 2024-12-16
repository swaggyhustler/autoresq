import {NavLink} from "react-router-dom";
import {useAuthStore} from "../../stores/authStore.js";
const Navbar=()=>{

    const {user, isAuthenticated, logout} = useAuthStore();
    console.log(user?.isAuthenticated);
    return (
        <nav className="flex justify-between p-5 shadow-xl rounded-2xl px-lg">
            <span className="font-black font-mono text-2xl">AutoResQ</span>
            {
                (user?.role==='user' && isAuthenticated) && <ul className="flex justify-around gap-5">
                    <li className="bg-slate-300 px-4 py-2 rounded-lg hover:bg-slate-400"><NavLink to="/home">Home</NavLink></li>
                    <li className="bg-slate-300 px-4 py-2 rounded-lg hover:bg-slate-400"><NavLink to="/register">Register</NavLink></li>
                    <li className="bg-slate-300 px-4 py-2 rounded-lg hover:bg-slate-400"><NavLink to="/login">Login</NavLink></li>
                    <li className="bg-slate-300 px-4 py-2 rounded-lg hover:bg-slate-400"><NavLink to="/assistance">Book Assistance</NavLink></li>
                    <li className="bg-slate-300 px-4 py-2 rounded-lg hover:bg-slate-400"><button onClick={async ()=>{await logout();}}>Logout</button></li>
                </ul>
            }
            {
                (user?.role === 'mechanic' && isAuthenticated) && 
                <ul className="flex justify-autoud gap-5">
                    <li className="bg-slate-300 px-4 py-2 rounded-lg hover:bg-slate-400"><NavLink to="/home">Home</NavLink></li>
                    <li className="bg-slate-300 px-4 py-2 rounded-lg hover:bg-slate-400"><NavLink to="/mechanic">List Requests</NavLink></li>
                    <li className="bg-slate-300 px-4 py-2 rounded-lg hover:bg-slate-400"><button onClick={async ()=>{await logout();}}>Logout</button></li>
                </ul>
            }   
            <a href="8200342755">+91 8200342755</a>
        </nav>
    )
}
export default Navbar;