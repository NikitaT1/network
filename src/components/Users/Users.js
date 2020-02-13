import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import PaginatorAdvanced from "../common/Paginator/PaginatorAdvanced";



let Users = (props) => {


        return <div>
            <PaginatorAdvanced currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                       totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}/>

            {props.users.map(u =>  <User key={u.id} followingInProgress={props.followingInProgress}
                                              unFollowUserThunk={props.unFollowUserThunk}
                                              followUserThunk={props.followUserThunk}
                user={u}/>
            )
            }
        </div>
    }



export default Users;