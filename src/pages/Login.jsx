import { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { AppContext } from "../context/AppContext";
import {API_ENDPOINTS} from "../util/text";
import { LoaderCircle } from "lucide-react";
import { validateEmail } from "../util/Validation";
import axiosConfig from "../util/axiosConfig";



const Login = () => {
      const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    const {setUser}=useContext(AppContext);


    const navigate = useNavigate();

 const handleSubmit=async (e) =>{
        e.preventDefault();
        setIsLoading(true);

      
        if(!validateEmail(email)){
            setError("Enter Your valid E-mail");
             setIsLoading(false);
            return;
        }
        if(!password.trim()){
            setError("Enter Your Password");
             setIsLoading(false);
            return;
        }

       setError("");

       //loginpAPI call

       try {
           const response=await axiosConfig.post(API_ENDPOINTS.LOGIN,{
               email,
                password,
            });
            const {token,user}=response.data;
            
               localStorage.setItem("token",token);
               setUser(user);
               navigate("/dashboard")
            
       } catch (error2) {
        if(error2.response && error2.response.data.message){
            setError(error2.response.data.message);
        }
        else{

            console.error('Something went wrong',error2);
            setError(error2.message);
        }
            
       }
       finally{
         setIsLoading(false);
       }
    }

    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {}
            <img src={assets.login_bg} alt="BackGround" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                     Welcome Back
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                    Enter Your Details
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                       

                            <Input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Adress"
                                placeholder="name@example.com"
                                type="text"

                            />
                            <div className="col-span-2">

                            <Input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder="*******"
                                type="password"

                            />
                            </div>

                            {
                                error && (
                                    <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                        {error}
                                    </p>
                                )
                            }
                       

                         <button disabled={isLoading} className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading?'opacity-60 cursor-not-allowed':''}`} type="submit">
                           {isLoading ?(
                            <>
                            <LoaderCircle className="animate-spin w-5 h-5" />
                            Logging in.....
                            </>
                           ):(

                          "LOG IN"
                           )}
                        </button>


                        <p className="text-sm text-slate-800 text-center mt-6">
                           Do Not Have Account? 
                            <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">
                            SIGN IN
                            </Link>
                        </p>

                    </form>
                </div>
            </div>        
        
        
        </div>
    )
}

export default Login;