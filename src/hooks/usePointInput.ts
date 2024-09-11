import { useState } from "react";
import { useUser } from "../contexts/UserProvider"
import { useForm } from "react-hook-form";
import { formatNumberWithCommas } from "../utils/fomatNumberWithCommas";

interface UsePointInputResult {
    customPoint: string;
    handleCustomPointChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setCustomPoint: (value: string) => void;
    disabled: boolean;
}

const usePointInput = ():UsePointInputResult => {
    
    const {user} = useUser();
    const [disabled, setDisabled] = useState(false);
    const {setValue, clearErrors, watch} = useForm();

    const customPoint = watch('customPoint') || '0';

    const handleCustomPointChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, '');
        let numberValue = Number(value);

        if(user && numberValue > user.totalPoint){
            numberValue = user.totalPoint;
            setDisabled(true);
        }else{
            clearErrors('customPoint');
            setDisabled(false);
        }
        setValue('customPoint', formatNumberWithCommas(numberValue));
    }

    return {
        customPoint,
        handleCustomPointChange,
        setCustomPoint:(value:string) => setValue('customPoint', value),
        disabled
    }
}

export default usePointInput;