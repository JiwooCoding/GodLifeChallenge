import ReactPaginate  from 'react-paginate'
import styles from './Pagination.module.scss'
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

interface PaginationProps{
    pageCount:number;
    handlePageClick: (data: { selected: number }) => void;
}

const Pagination = ({pageCount, handlePageClick}:PaginationProps) => {
    return (
            <ReactPaginate 
                previousLabel={<SlArrowLeft/>}
                nextLabel={<SlArrowRight/>}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                disabledClassName={styles.disabled}
                pageClassName={styles.page}
            />
    )
}

export default Pagination