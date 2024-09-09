import { Dispatch, SetStateAction } from 'react'
import styles from './PriceSort.module.scss'

interface PriceSortProps{
    sortOrder: 'asc' | 'desc';
    setSortOrder: Dispatch<SetStateAction<'asc' | 'desc'>>;
}

const PriceSort = ({sortOrder, setSortOrder}:PriceSortProps) => {

    return (
        <div className={styles.sortPrice}>
            <button 
                className={`${styles.lowPrice} ${sortOrder === 'asc' ? styles.active : ''}`}
                onClick={() => setSortOrder('asc')}
            >
                낮은가격순
            </button>
            <button
                className={`${styles.highPrice} ${sortOrder === 'desc' ? styles.active : ''}`}
                onClick={() => setSortOrder('desc')}
            >
                높은가격순
            </button>
        </div>
    )
}

export default PriceSort