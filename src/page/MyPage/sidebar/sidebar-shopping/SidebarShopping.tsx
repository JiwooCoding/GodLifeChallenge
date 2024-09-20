import { ComponentTypes } from '../../../../data/challengeData';
import styles from './SidebarShopping.module.scss'

interface SidebarShoppingProps {
    handleClick: (component:ComponentTypes) => void;
    activeItem:string | null;
}

const SidebarShopping = ({handleClick, activeItem}:SidebarShoppingProps) => {
    return (
        <ul className={styles.sidebar_myshopping}>
            <h2>마이 쇼핑</h2>
            <li 
                onClick={()=>handleClick('Product')}
                className={activeItem === 'Product' ? styles.active : ''}
            >
                주문 조회
            </li>
            <li 
                onClick={()=>handleClick('donation')}
                className={activeItem === 'donation' ? styles.active : ''}
            >
                기부 내역 조회
            </li>
            <li 
                onClick={()=>handleClick('gift')}
                className={activeItem === 'gift' ? styles.active : ''}
            >
                선물 내역 조회
            </li>
            <li 
                onClick={()=>handleClick('event')}
                className={activeItem === 'event' ? styles.active : ''}
            >
                적립 내역 조회
            </li>
        </ul>
    )
}

export default SidebarShopping