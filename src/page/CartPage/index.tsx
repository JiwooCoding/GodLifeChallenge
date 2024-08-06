import { useAppSelector } from '../../hooks/redux'
import CartEmpty from '../../components/cart-empty/CartEmpty';
import CartList from './cart-list/CartList';
import CheckOut from './check-out/Checkout';

const CartPage = () => {

    const {products} = useAppSelector((state) => state.cartSlice);

    return (
        <div className='inner'>
            {!products.length ? (
                <CartEmpty/>
            ) : (
                <div>
                    <h1 className='text-[20px]'>장바구니 ( <b className='text-red-500'>{products.length}</b> )</h1>
                    <CartList/>
                    <CheckOut/>
                </div>
            )}
        </div>
    )
}

export default CartPage