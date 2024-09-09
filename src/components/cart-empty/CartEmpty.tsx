import React from 'react'
import cartEmpty from '../../image/cart/free-icon-shopping-13982871.png'
import styles from './CartEmpty.module.scss'

const CartEmpty = () => {
  return (
    <div className={styles.cartEmpty}>
      <img src={cartEmpty} style={{width:'200px'}}/>
      <h1>장바구니에 저장된 상품이 없습니다</h1>
    </div>
  )
}

export default CartEmpty