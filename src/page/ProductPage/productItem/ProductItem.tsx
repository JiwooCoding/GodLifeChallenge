import { useAppdispatch } from '../../../hooks/redux';
import { addToCart } from '../../../store/cart/cartSlice';
import { IProduct } from '../../../type/IProduct';


type ProductItemProps = {
    product: IProduct;
    handlePurchaseClick: (productPoints:number) => void;
}

const ProductItem = ({product, handlePurchaseClick}:ProductItemProps) => {
    
    const dispatch = useAppdispatch();

    const addItemToCart = () => {
        dispatch(addToCart(product));
    }

    return (
    <li key={product.id} className='product-item'>
        <div className='flex flex-col items-center'>
            <img src={product.productImages} alt={product.productName} style={{ width: '80px', height: '100px' }} />
            <p>{product.productName}</p>
            <p>{product.price} P</p>
            <button className='product_button' onClick={() => addItemToCart()}>장바구니</button>
            {/* <button className='product_button' onClick={() => handlePurchaseClick(product.price)}>구매하기</button> */}
        </div>
    </li>

    )
}

export default ProductItem
