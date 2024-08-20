import Login_Register_Template from "../componets/Login_Register_Template.jsx";
import InputField from "../componets/InputField.jsx";
const Login=()=>{
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="h-3/2 w-2/3 flex justify-center">
                <Login_Register_Template ButtonMessage="Sign in">
                    <div>
                        <InputField name="name">
                            <i className="fa-regular fa-user mr-2"></i>
                            Name
                        </InputField>
                        <InputField name="password">
                            <i className="fa-solid fa-lock mr-2"></i> 
                            Password
                        </InputField>
                    </div>
                </Login_Register_Template>
            </div>
        </div>
    )
}

export default Login;