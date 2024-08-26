import { useEffect, useState } from 'react';
import styles from './OrderList.module.scss';
import { IOrderProducts, IProduct } from '../../../../../type/IProduct';
import usePagination from '../../../../../hooks/usePagination';
import api from '../../../../../api/api';
import Loading from '../../../../../components/loading/Loading';
import OrderItem from '../order-item/OrderItem';
import Pagination from '../../../../../components/pagination/Pagination';




const OrderList = () => {
    const [order, setOrder] = useState<IOrderProducts[]>([]);
    const [loading, setLoading] = useState(true); 
    const [itemsPerPage] = useState(8); //한 페이지당 보여줄 order 갯수
    const pageCount = Math.ceil(order.length / itemsPerPage); //총 페이지 수 계산
    const {currentPage, handlePageClick} = usePagination();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get<IOrderProducts[]>('/api/shop/purchases');
                const data = response.data;
                setOrder(data);
                console.log('data=>',data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); 
            }
        };

        fetchOrders();
    }, []);

    const currentOrders = order
        .flatMap(item => item.products)
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <div className={styles.order_header}>
                <div className={styles.date}>주문일</div>
                <div className={styles.orderInfo}>주문내역</div>
                <div className={styles.quantity}>수량</div>
                <div className={styles.payment}>결제금액</div>
            </div>
            {loading ? (
                <Loading /> 
            ) : currentOrders.length > 0 ? (
                <>
                    <ul>
                        {currentOrders.map((product: IProduct, index: number) => (
                            <OrderItem
                                key={index}
                                item={product}
                                pointsUsed={order.find(o => o.products.includes(product))?.pointsUsed || 0}
                                itemQuantity={order.find(o => o.products.includes(product))?.itemQuantity || 0}
                                purchaseDate={order.find(o => o.products.includes(product))?.purchaseDate || ''}
                            />
                        ))}
                    </ul>
                    <Pagination
                        pageCount={pageCount}
                        handlePageClick={handlePageClick}
                    />
                </>
            ) : (
                <div className={styles.noOrder}>주문 내역이 없습니다</div>
            )}
        </>
    );
};

export default OrderList;
