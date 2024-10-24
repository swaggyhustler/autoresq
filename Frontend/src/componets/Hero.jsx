import Avatar from "../assets/Avatar.png";
import {motion} from "framer-motion";
import {useAuthStore} from "../stores/authStore";
import {useNavigate} from "react-router-dom";
const Hero = () => {
  const {user} = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex justify-around items-center">
        <motion.div className="w-1/2" initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 1, delay: 0.5}}>
            <h1 className="mb-3 leading-tight font-bold text-5xl">Your one stop solution for Breakdown Assistance</h1>
            <p className="text-lg w-2/3">Register on spot for a vehicle breakdown assistance, we are your vehicle best partner. Ensuring reliable and trust worthy experience.</p>
            <div>
              {user?.role === 'user' ? (
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 my-3"
                  onClick={()=>{navigate('/assistance')}}
                >
                  Show Nearest Mechanics
                </button>
              ) : (
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 my-3"
                  onClick={()=>{navigate('/mechanic')}}
                >
                  Show Incoming Requests
                </button>
              )}
            </div>
        </motion.div>
        <motion.div initial={{x: 100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 1, delay: 0.5}}>
            <img src={Avatar} alt="avatar" />
        </motion.div>
    </div>
  );
};
export default Hero;
