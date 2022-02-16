import React, {useState} from 'react';
import classNames from "classnames";
import classes from './pagination.module.css';

const Pagination = ({data, dataLimit, pageLimit}) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div>
            <div className={classes.pagination}>
                <button
                    onClick={goToPreviousPage}
                    className={classes.prev}
                    disabled={currentPage === 1}
                >
                    prev
                </button>

                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={currentPage === item ? classNames(classes.active, classes.paginationItem) : classes.paginationItem}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                <button
                    onClick={goToNextPage}
                    className={classes.next}
                    disabled={currentPage === pages}
                >
                    next
                </button>
            </div>
        </div>
    );
};

export default Pagination;