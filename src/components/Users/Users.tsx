import React from 'react';
import User from "./User";
import PaginatorAdvanced from "../common/Paginator/PaginatorAdvanced";
import {UserType} from "../../types/types";

type PropsType = {
    currentPage: number
    onPageChanged: any
    totalUsersCount: number
    pageSize: number
    followingInProgress: any
    unFollowUserThunk: () => void
    followUserThunk: () => void
    portionSize?: any
    pages: any
    toggleFollowingProgress: () => void
    users: Array<UserType>
}


let Users: React.FC<PropsType> = (props) => {
        return (<div>
            <PaginatorAdvanced currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                       totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                               portionSize={props.portionSize} pages={props.pages}/>

            {props.users.map(u =>  <User key={u.id} followingInProgress={props.followingInProgress}
                                              unFollowUserThunk={props.unFollowUserThunk}
                                              followUserThunk={props.followUserThunk}
                user={u}/>
            )
            }
        </div>)
    }



export default Users;