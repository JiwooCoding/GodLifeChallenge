import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
    hasAttendance:boolean;
    clickHandler:() => void;
    disabled: boolean;
}

const Button = ({hasAttendance, clickHandler, disabled}:ButtonProps) => {
  return (
    <div className={styles.button_style}>
        <button
        onClick={clickHandler}
        disabled={disabled}
        className='check-in-button'
        >
            {hasAttendance ? '내일 또 봐요' : '출석체크'}
        </button>
    </div>
  )
}

export default Button