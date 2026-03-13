import axios from "axios";
import {BASE_URL} from "./text";

const axiosConfig = axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
})

const excludeEndPoints=["/login","/register","/status","/health","/activate"];


//request interceptor
axiosConfig.interceptors.request.use((config) => {
   const shouldSkipToken= excludeEndPoints.some((endpoint)=>{
         return config.url?.includes(endpoint)
});

    if(!shouldSkipToken){
       const accsesToken= localStorage.getItem("token");
        if(accsesToken){
            config.headers.Authorization = `Bearer ${accsesToken}`;
        }

        
    }
    return config;
},(error)=>{
    return Promise.reject(error);
});


//response interceptor

axiosConfig.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    if(error.response){
        if(error.response.status === 401){
           window.location.href="/login" ;
        } else if(error.response.status === 500){
            console.error("Server error. Please Try later");
        } else if(error.code==="ECONNABORTED"){
            console.error("Request timeout. Please Try later");
        }

        return Promise.reject(error);
  }
});


export default axiosConfig;