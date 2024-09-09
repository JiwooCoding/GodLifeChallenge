import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
    onclick?: () => void;
    disabled?: boolean;
    children:React.ReactNode;
    variant: 'main' | 'check' | 'confirm' | 'close' | 'attendance';
    type?: 'submit' | 'button';
}

const Button = ({onclick, disabled, children, variant, type}:ButtonProps) => {
    return (
        <button
            onClick={onclick}
            disabled={disabled}
            className={`${styles[variant]}`}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button