import { useState } from "react"

const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (data:{selected:number}) => {
        setCurrentPage(data.selected);
    }

    return {
        currentPage,
        setCurrentPage,
        handlePageClick
    };
};

export default usePagination;