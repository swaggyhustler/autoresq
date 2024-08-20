import Navbar from "./componets/Navbar.jsx";
import Hero from "./componets/Hero.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

const App=()=>{
  return(
    <>
      <Navbar />
      <Hero />
      <Register />
      <Login />
    </>
  );
}
export default App;