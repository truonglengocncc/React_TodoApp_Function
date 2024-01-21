import React from 'react';
// import './Footer.css';
import { ACTION, LIMIT } from './constant';

const Footer = ({ applyFilter, count, currentPage, handlePagination, length }) => {
    return (
        <div className='footerContainer'>
            <div className='countItem'>Count item complete: {count}</div>
            <div className='actionButton'>
                <button className='button' onClick={() => { applyFilter(ACTION.ALL) }}>All</button>
                <button className='button' onClick={() => { applyFilter(ACTION.ACTIVE) }}>Active</button>
                <button className='button' onClick={() => { applyFilter(ACTION.COMPLETE) }}>Completed</button>
            </div>
            <div className='actionButton'>
                <button disabled={currentPage <= 1} onClick={() => {
                    const prevPage = currentPage <= 0 ? currentPage : currentPage - 1;
                    handlePagination(prevPage);
                }}>
                    Prev
                </button>
                <button disabled={currentPage >= (length / LIMIT)} onClick={() => {
                    const nextPage = currentPage > length ? currentPage : currentPage + 1;
                    handlePagination(nextPage);
                }}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Footer;
