import { useAppSelector } from '../../../hooks/redux'
import CartItem from './cart-item/CartItem';

const CartList = () => {

  const {products} = useAppSelector((state) => state.cartSlice);

  return (
    <div className='mt-[50px]'>
      {products.map((product) => (
        <CartItem key={product.id} product={product}/>
      ))}
    </div>
  )
}

export default CartList