import { useEffect } from 'react'
import styles from './Checkout.module.scss'
import { useAppdispatch, useAppSelector } from '../../../hooks/redux'
import { useUser } from '../../../UserProvider';
import { getTotalPrice, postOrder } from '../../../store/cart/cartSlice';
import { Link } from 'react-router-dom';

const CheckOut = () => {
  
  const dispatch = useAppdispatch();
  const cart = useAppSelector((state) => state.cartSlice); // Redux 스토어에서 'cartSlice' 상태 가져옴
  const {user} = useUser();

  const sendOrder = () => {
    dispatch(postOrder(cart));
  }

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [cart]); //cart데이터가 변할 때마다 다시 계산할 수 있도록 종속성배열에 [cart]
  

  
  return (
    <div className={styles.checkout}>
      <div>
        <p>
          <span className={styles.totalPrice_text}>총 예상 금액</span>
          <span className={styles.totalPrice_amount}><b>{cart.totalPrice.toFixed(0)}</b> 포인트</span>
        </p>
        {!user ? (
          <Link to={'/login'} className={styles.checkout_button}><span>로그인</span></Link>
        ) : (
          <button
          className={styles.checkout_button}
          onClick={() => sendOrder()}
          >구매하기</button>
        )}
      </div>
    </div>
  )
}

export default CheckOut