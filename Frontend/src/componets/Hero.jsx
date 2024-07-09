import Avatar from "../assets/Avatar.png";
const Hero = () => {
  return (
    <div className="flex justify-around items-center bg-indigo-500">
        <div className="w-1/2">
            <h1 className="mb-3 leading-tight font-bold text-5xl">Your one stop solution for Breakdown Assistance</h1>
            <p className="text-lg w-2/3">Register on spot for a vehicle breakdown assistance, we are your vehicle best partner. Ensuring reliable and trust worthy experience.</p>
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 my-3">Register</button>
        </div>
        <div>
            <img src={Avatar} alt="avatar" />
        </div>
    </div>
  );
};
export default Hero;
