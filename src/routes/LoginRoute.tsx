import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider"

const LoginRoute = ({children}:{children:React.ReactNode}) => {

    const {user} = useUser();

    if(user){
        return <Navigate to={'*'} replace/>;
    }else{
        return  <div>{children}</div>
    }

}

export default LoginRoute