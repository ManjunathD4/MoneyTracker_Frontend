import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/text";
import { assets } from "../assets/assets";

const Activation=()=>{


    const[params]=useSearchParams();
    const[message,setMessage]=useState("Activating");

   useEffect(() => {
  const activateUser = async () => {
    try {
      const token = params.get("token");

      const response = await axiosConfig.get(
        `${API_ENDPOINTS.ACTIVATE}?token=${token}`
      );

      setMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Activation failed", error);
    }
    
  };

  activateUser();
}, []);

const styles = {
 
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    width: "350px",
  },
  icon: {
    fontSize: "50px",
    marginBottom: "10px",
  },
  title: {
    margin: "10px 0",
    color: "#333",
  },
  message: {
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#667eea",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
};
return (
 <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img src={assets.login_bg} alt="BackGround" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
        <div className="relative z-10 w-full max-w-lg px-6">
    <div style={styles.card}>
      
      <div style={styles.icon}>
        {message.includes("Activated") ? "✅" : "❌"}
      </div>

      <h1 style={styles.title}>
        {message.includes("Activated") ? "Success!" : "Oops!"}
      </h1>

      <p style={styles.message}>{message}</p>

      <button style={styles.button} onClick={() => window.location.href = "/login"}>
        Go to Login
      </button>

    </div>
    </div>
  </div>
);
}
  
export default Activation;