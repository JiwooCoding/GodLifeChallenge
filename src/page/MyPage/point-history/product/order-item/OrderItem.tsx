import { IProduct } from '../../../../../type/IProduct';
import styles from './OrderItem.module.scss';
import { formatDate } from '../../../../../utils/formatData';

interface OrderItemProps {
    item: IProduct;
    pointsUsed?: number;
    itemQuantity:number;
    purchaseDate:string;
}

const OrderItem = ({ item, pointsUsed, itemQuantity, purchaseDate }: OrderItemProps) => {

    return (
        <li>
            <div className={styles.order_result}>
                <div className={styles.order_date}>{formatDate(purchaseDate)}</div>
                <div className={styles.order_orderInfo}>
                    <img src={item.productImages} className={styles.product_image} alt='product image' />
                    <div className={styles.order_orderInfo_detail}>
                        <span className={styles.productCompany}>{item.productCompany}</span>
                        <span className={styles.productName}>{item.productName}</span>
                    </div>
                </div>
                <div className={styles.order_quantity}>{itemQuantity}</div>
                <div className={styles.order_payment}>{pointsUsed}</div>
            </div>
        </li>
    );
};

export default OrderItem;
