import React from "react";
import { Link } from 'react-router-dom'
import * as PATHS from '../../constants/Routes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const SidebarUser=(props)=>{
    
    return ( 
                props.username && props.fullName ? 
                <div className="user">
                <Link className="profileimg" to={`${PATHS.PROFILE}/${props.username}`}>
                <img
                    src={`https://raw.githubusercontent.com/Amr-Zain/React-Instagram-Clone/master/public/images/avatars/${props.username}.jpg`}/*change to  */
                    alt={`${props?.username} profile`}
                    onError={(e) => {
                    e.target.src = `https://raw.githubusercontent.com/Amr-Zain/React-Instagram-Clone/master/public/images/avatars/default.png`;
                    }}
                />
                </Link>
                <div className="userinfo">
                    <Link to={`${PATHS.PROFILE}/${props?.username}`}>
                        <h3 className="username">{props?.username}</h3>
                    </Link>
                    <p className="fullname">{props?.fullName}</p>
                </div>
                
            </div>
            :
            ( <div style={{display:'flex',gap:'2rem',margin:'1rem'}}>
                    <Skeleton count={1} height={52} width={52} style={{borderRadius:'50%'}} /> 
                    <div>
                        <Skeleton count={1} height={8} width={100}  /> 
                        <Skeleton count={1} height={8} width={70}  /> 
                    </div>
            </div>)
        )
}
export default SidebarUser ;

