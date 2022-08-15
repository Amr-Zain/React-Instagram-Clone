import {Link} from "react-router-dom"
import { PROFILE } from "../../constants/Routes";
import { updateFollowing , updateFollowers } from '../../services/firebase'
import React from "react";
import Unfollow from "../Unfollow";
function Header({username,imgUserDocId,imgUserId,userId,userDocId}){
    //console.log("header")
    const [overlayState,setOverlayState] = React.useState(false);
    async function unfollowHandler(){
        setOverlayState(false);
        await updateFollowing(userDocId,imgUserId,true);
        await updateFollowers(imgUserDocId,userId,true);
    }

    return (
        <div className="header">
            <Link className="user-info" to ={`${PROFILE}/${username}`}>
                <img src={`./images/avatars/${username}.jpg`} alt={username} 
                onError={(e)=>{
                    e.target.src ="./images/avatars/default.png"
                }}/>
                <h3 className="username">{username}</h3>
            </Link>
            <svg onClick={()=>setOverlayState(true)} aria-label="More options" className="_ab6-" color="#262626" fill="#262626" height="24" 
                role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5">
                </circle><circle cx="6" cy="12" r="1.5"></circle>
                <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
            <Unfollow overlayState={overlayState} setOverlayState={setOverlayState} 
                    username={username} unfollowHandler={unfollowHandler}/>
        </div>
                )
}


export default React.memo(Header);