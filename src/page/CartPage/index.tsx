import { useAppSelector } from '../../hooks/redux'
import CartEmpty from '../../components/cart-empty/CartEmpty';
import CartList from './cart-list/CartList';
import CheckOut from './check-out/Checkout';

const CartPage = () => {

    const {products} = useAppSelector((state) => state.cartSlice);

    return (
        <div className='inner'>
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