import { useState } from "react"

const useActiveInput = () => {
    const [activeInput, setActiveInput] = useState<string>('');

    const handleFocus = (inputId: string) => {
        setActiveInput(inputId);
    };

    const handleBlur = () => {
        setActiveInput('');
    };

    return { activeInput, handleFocus, handleBlur };
}

export default useActiveInput;