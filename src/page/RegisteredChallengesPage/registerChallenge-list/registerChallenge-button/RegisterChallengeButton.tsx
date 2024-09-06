import React, { useState } from 'react'
import api from '../../../../api/api';

const RegisterChallengeButton = () => {
    
    const [buttonText, setButtonText] = useState('');
    
    const handleClick = async() => {
        try {
            await api.put('/api/challenge');
        } catch (error) {
            
        }
    }

    return (
        <div>
            <button></button>
        </div>
    )
}

export default RegisterChallengeButton