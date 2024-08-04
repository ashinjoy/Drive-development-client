import axios from 'axios'

const getAccessToken =()=>{
    return localStorage.getItem('driverAccessToken')
}

export const driverPrivate = axios.create({
    baseURL:'http://localhost:3001/api/',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true
})

driverPrivate.interceptors.request.use((request)=>{
const driverAccessToken = getAccessToken()
if(driverAccessToken){
    request.headers['Authorization'] = `Bearer ${driverAccessToken}`
}
return request
},(error)=>{
   return Promise.reject(error)
})

driverPrivate.interceptors.response.use((response)=>{
    return response
},async(error)=>{
    const originalRequest = error.config;
    console.log(error);
    try {
      if (error?.response?.status === 401 && !originalRequest._retry) {
        console.log('entry');
        
        originalRequest._retry = true
        const response = await driverPrivate.get("auth/driver/refreshToken");
        const newUserAccessToken = response.data;
        console.log('user',newUserAccessToken);
     localStorage.setItem(
          "driverAccessToken",
          newUserAccessToken
        );
        driverPrivate.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newUserAccessToken}`;
        return driverPrivate(originalRequest);
      }
    } catch (error) {

    }
    return Promise.reject(error)
})
