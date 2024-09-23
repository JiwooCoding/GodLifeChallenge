import React from 'react'
import styles from './ChallengeButton.module.scss'

interface ChallengeButtonProps{
    children:React.ReactNode;
    variant: 'confirm' | 'cancle' | 'finish' | 'inaccessible';
    type?: 'submit' | 'button';
    disabled?:boolean;
    onClick?:()=>void;
}

const ChallengeButton = ({children, variant, type, disabled, onClick}:ChallengeButtonProps) => {
    return (
        <button
            className={`${styles[variant]}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default ChallengeButton