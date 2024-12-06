import axios from "axios";
import { BASE_URL } from "./constant";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    },

})

axiosInstance.interceptors.request.use(
    (config)=>{
        const accesstoken = localStorage.getItem("token")
        console.log(accesstoken)
        if(accesstoken){
            config.headers.Authorization = `Bearer ${accesstoken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)



export default axiosInstance