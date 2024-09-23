import React from 'react'
import { selectData } from '../../data/selectOptionData';
import styles from './SelectOption.module.scss'

interface SelectOptionProps {
    selectedStatus:string;
    onStatusChange:(state:string) => void;
}

const SelectOption = ({selectedStatus, onStatusChange}:SelectOptionProps) => {
    
    const handleStateChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        onStatusChange(e.target.value);
    }

    return (
        <div>
            <select
            className={styles.selectbox}
            value={selectedStatus}
            onChange={handleStateChange}
            >
                {selectData.map(status => (
                    <option key={status.id}>
                        {status.state}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectOption