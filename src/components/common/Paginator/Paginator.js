import React from 'react';
import styles from './paginator.module.css';




let Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for ( let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

        return <div>
                {pages.map (p => {
                    return <span className={props.currentPage === p && styles.selectedPage}
                    onClick={(e)=>{props.onPageChanged(p)}}>{p}</span>
                })}
            </div>

    }



export default Paginator;