import { useSelector } from "react-redux";

export const useIsLogin = () => {
    const email = useSelector((state: any) => state.user.email);

    if(email){
        return true;
    };

    return false;
}