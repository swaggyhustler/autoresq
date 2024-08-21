import {NavLink} from "react-router-dom";
const Navbar=()=>{
    return (
        <nav className="flex justify-between p-5 shadow-lg rounded-2xl px-lg">
            <span className="font-black font-mono text-2xl">AutoResQ</span>
            <ul className="flex justify-around gap-5">
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="#">link4</NavLink></li>
                <li><NavLink to="#">link5</NavLink></li>
            </ul>
            <a href="8200342755">+91 8200342755</a>
        </nav>
    )
}
export default Navbar;