import { useAppSelector } from '../../../hooks/redux'
import CartItem from './cart-item/CartItem';
import styles from './CartList.module.scss'

const CartList = () => {

  const {products} = useAppSelector((state) => state.cartSlice);

  return (
    <ul className={styles.cartList}>
      <h1 className={styles.cart_title}>장바구니 ( <b className={styles.cart_count}>{products.length}</b> )</h1>
      {products.map((product) => (
        <CartItem key={product.id} product={product}/>
      ))}
    </ul>
  )
}

export default CartList