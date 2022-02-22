import React from 'react';
import classnames from 'classnames';
import {usePagination, DOTS} from './usePagination';
import './pagination.scss';
import Select from "../select/Select";
import SelectSort from "../selectSort/SelectSort";

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
        setPageSize,
        setCurrentPage,
        setIsReload,
        setSort,
        isReload
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // if (currentPage === 0 || paginationRange.length < 2) {
    //     return null;
    // }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <div className={classnames('pagination-wrapper')}>
            <Select setPageSize={setPageSize} setCurrentPage={setCurrentPage} isReload={isReload} setIsReload={setIsReload}/>
            <SelectSort setSort={setSort} setCurrentPage={setCurrentPage} isReload={isReload} setIsReload={setIsReload}/>
            <ul
                className={classnames('pagination-container', {[className]: className})}
            >
                <li
                    className={classnames('pagination-item', {
                        disabled: currentPage === 1
                    })}
                    onClick={onPrevious}
                >
                    <div className="arrow left"/>
                </li>
                {paginationRange.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return <li className="pagination-item dots">&#8230;</li>;
                    }

                    return (
                        <li
                            className={classnames('pagination-item', {
                                selected: pageNumber === currentPage
                            })}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                <li
                    className={classnames('pagination-item', {
                        disabled: currentPage === lastPage
                    })}
                    onClick={onNext}
                >
                    <div className="arrow right"/>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
