import { IProduct } from '../../../../type/IProduct'
import { useAppdispatch } from '../../../../hooks/redux';
import { decrementProduct, deleteFromCart, incrementProduct } from '../../../../store/cart/cartSlice';
import { AiOutlineDelete } from 'react-icons/ai';
import styles from './CartItem.module.scss'
import { LuMinus, LuPlus } from "react-icons/lu";
import { formatNumberWithCommas } from '../../../../utils/fomatNumberWithCommas';
import { useEffect, useState } from 'react';
import api from '../../../../api/api';

interface CartItemProps {
  product:IProduct;
}

const CartItem = ({product}:CartItemProps) => {

  const [stock, setStock] = useState(product.stock); 
  const [stockMessage, setStockMessage] = useState('');

  const dispatch = useAppdispatch();

  useEffect(() => {
    const fetchProductData = async() => {
      try {
        const response = await api.get(`/api/shop/${product.id}`);
        const data = response.data;
        setStock(data.stock);
        if(data.stock < 10){
          setStockMessage('재고가 10개 미만으로 남았습니다. 구매를 서둘러주세요!');
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchProductData();
  }, [product.id])
  

  const deleteProduct = () => {
    if(window.confirm('해당 상품을 삭제하시겠습니까?')){
      dispatch(deleteFromCart(product.id));
    }
  }

  const incrementCount = () => {
    if(product.quantity < stock && product.quantity < 10){
      dispatch(incrementProduct(product.id));
    }else {
      alert(`해당 상품은 최대 ${Math.min(stock, 10)}개까지만 구매할 수 있습니다!`);
    }
  };

  const decrementCount = () => {
    dispatch(decrementProduct(product.id));
  };

  const isIncrementDisabled = product.quantity >= stock || product.quantity >= 10;


  return (
    <li className={styles.cart_container}>
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
              <button disabled={isIncrementDisabled} onClick={incrementCount}>
                <LuPlus size={12}/>
              </button>
            </div>
          </div>
          <button onClick={deleteProduct} className={styles.cart_delete}>
            <AiOutlineDelete/>
          </button>
        </div>
        <p className={styles.stockMessgae}>{stockMessage}</p>
      </li>
    )
  }

export default CartItem