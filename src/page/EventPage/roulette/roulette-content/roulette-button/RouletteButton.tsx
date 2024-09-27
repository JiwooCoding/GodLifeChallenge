import React from 'react'
import rouletteData from '../../../../../data/rouletteData';
import styles from './RouletteButton.module.scss'

interface ButtonProps {
    disabled:boolean;
    spin:boolean;
    setSpin:React.Dispatch<React.SetStateAction<boolean>>;
    setPrizeNumber:React.Dispatch<React.SetStateAction<number | null>>;
    spinCount:number;

}

const RouletteButton = ({ spin, setSpin, setPrizeNumber, spinCount, disabled}:ButtonProps) => {

    const handleSpinClick = () => {
    
        // spinStop false이고 남은 스핀 카운트가 있을 때만 실행
        if (!spin && spinCount > 0) { 
            const pivot = Math.floor((Math.random() * 99) + 1);
            let stack = 0;
        
            let percentage = rouletteData.map((row) => {
                return row.percentage; 
            });
        
            let newPrizeNumber: number | null = null;
        
            percentage.some((row, index) => {
                stack += row;
        
                if (pivot <= stack) {
                    newPrizeNumber = index;
                    return true;
                }
                return false;
            });
        
            if (newPrizeNumber !== null) {
                setPrizeNumber(newPrizeNumber);
                setSpin(true);
                }
            }
        };

    return (
        <button
        className={`${styles.roulette_button} ${disabled ? `${styles.disabled}` : ''}`}
        onClick={handleSpinClick}
        disabled={disabled}
        >
            {disabled ? 'END' : 'START'}
        </button>
    )
}

export default RouletteButton