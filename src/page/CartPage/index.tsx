import { useAppSelector } from '../../hooks/redux'
import CartEmpty from '../../components/cart-empty/CartEmpty';
import CartList from './cart-list/CartList';
import CheckOut from './check-out/Checkout';
import styles from './CartPage.module.scss'

const CartPage = () => {

    const {products} = useAppSelector((state) => state.cartSlice);

    return (
        <div className='inner'>
            <h1 className={styles.cart_title}>장바구니 ( <b className={styles.cart_count}>{products.length}</b> )</h1>
            {products.length === 0 ? (
                <CartEmpty/>
            ) : (
                <>
                    <CartList/>
                    <CheckOut/>
                </>
            )}
        </div>
    )
}

export default CartPage