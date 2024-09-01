import { Navigate } from "react-router-dom";

const LoginRoute = ({children}:{children:React.ReactNode}) => {

    const isLoggedIn = localStorage.getItem('accessToken') !== null;

    if(isLoggedIn){
        return <Navigate to={'*'} replace/>;
    }else{
        return  <div>{children}</div>
    }

}

export default LoginRoute