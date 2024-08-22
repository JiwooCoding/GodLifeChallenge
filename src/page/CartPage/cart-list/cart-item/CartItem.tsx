import { IProduct } from '../../../../type/IProduct'
import { useAppdispatch } from '../../../../hooks/redux';
import { decrementProduct, deleteFromCart, incrementProduct } from '../../../../store/cart/cartSlice';
import { AiOutlineDelete } from 'react-icons/ai';
import styles from './CartItem.module.scss'
import { LuMinus, LuPlus } from "react-icons/lu";
import { formatNumberWithCommas } from '../../../../utils/fomatNumberWithCommas';

interface CartItemProps {
  product:IProduct;
}

const CartItem = ({product}:CartItemProps) => {

  const dispatch = useAppdispatch();

  const deleteProduct = () => {
    if(window.confirm('해당 상품을 삭제하시겠습니까?')){
      dispatch(deleteFromCart(product.id));
    }
  }

  const incrementCount = () => {
    dispatch(incrementProduct(product.id));
  }

  const decrementCount = () => {
    dispatch(decrementProduct(product.id));
  }


  return (
    <div className={styles.cart_item}>
      <div className={styles.item_image}>
        <img src={product.productImages} alt='product image'/>
      </div>
      <div className={styles.cart_description}>
        <h3>{product.category}</h3>
        <h2>{product.productName}</h2>
        <div className={styles.point_cal}>
          <span>{formatNumberWithCommas(product.total)}</span>  <span>X {product.quantity}</span>  <span> = {formatNumberWithCommas(product.total)}포인트</span>
        </div>
      </div>
        <div className={styles.cart_count}>
          <div>
            <button disabled={product.quantity === 1} onClick={decrementCount}>
              <LuMinus size={12}/>
            </button>
            <span>{product.quantity}</span>
            <button disabled={product.quantity === 10} onClick={incrementCount}>
              <LuPlus size={12}/>
            </button>
          </div>
        </div>
        <button onClick={deleteProduct} className={styles.cart_delete}>
          <AiOutlineDelete/>
        </button>
      </div>
    )
  }

export default CartItem