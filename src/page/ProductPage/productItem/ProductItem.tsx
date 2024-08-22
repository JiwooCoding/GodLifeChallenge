import { useAppdispatch } from '../../../hooks/redux';
import { addToCart } from '../../../store/cart/cartSlice';
import { IProduct } from '../../../type/IProduct';
import { formatNumberWithCommas } from '../../../utils/fomatNumberWithCommas';
import styles from './ProductItem.module.scss'
import cart from '../../../image/cart/free-icon-shopping-bag-2956820.png'


type ProductItemProps = {
    product: IProduct;
}

const ProductItem = ({product}:ProductItemProps) => {
    
    const dispatch = useAppdispatch();

    const addItemToCart = () => {
        dispatch(addToCart(product));
    }

    return (
    <li key={product.id} className={styles.product_items}>
        <div className={styles.product_item}>
            <img src={product.productImages} alt={product.productName} style={{marginBottom:"10px"}}/>
            <p className={styles.productCompany}>{product.productCompany}</p>
            <p className={styles.productName}>{product.productName}</p>
            <div className={styles.priceNcart}>
                <p className={styles.productPrice}>{formatNumberWithCommas(product.price)} P</p>
                <img src={cart} style={{width:'33px', cursor:'pointer'}} onClick={() => addItemToCart()}/>
            </div>
        </div>
    </li>

    )
}

export default ProductItem
