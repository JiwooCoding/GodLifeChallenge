import { useAppSelector } from '../../../hooks/redux'
import CartItem from './cart-item/CartItem';
import styles from './CartList.module.scss'

const CartList = () => {

  const {products} = useAppSelector((state) => state.cartSlice);

  return (
    <ul className={styles.cartList}>
      {products.map((product) => (
        <CartItem key={product.id} product={product}/>
      ))}
    </ul>
  )
}

export default CartList