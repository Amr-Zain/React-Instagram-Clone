import React from "react";
import * as PATHS from '../../constants/Routes'
import {Link} from "react-router-dom"
import { updateFollowers ,updateFollowing } from '../../services/firebase'
import Unfollow from "../Unfollow";

function SuggestedProfile({activeUserDocId,activeUserId,fullName,suggDocId,suggUserId,username}){
    const [follow,setFollow] = React.useState(false);
    const [overlayState,setOverlayState] = React.useState(false);

    async function followHandler(){
        setFollow(true);
        await updateFollowing(activeUserDocId,suggUserId,false);//add the sugg to the following array
        await updateFollowers(suggDocId,activeUserId,false);//add the active to the followers array
    }
    
    async function unfollowHandler(){
        setOverlayState(false);
        setFollow(false);
        await updateFollowing(activeUserDocId,suggUserId,true);
        await updateFollowers(suggDocId,activeUserId,true);
    }
    React.useEffect(()=>{
        const listener =()=>{
            if(window.innerWidth<900){
                setOverlayState(false);
            }}

        window.addEventListener('resize',listener);
        
        return ()=>window.removeEventListener("resize",listener);
    })

    return (<div className="suggestedprofile">
                <div className="info">
                    <Link className="profileimg" to ={`${PATHS.PROFILE}/${username}`}>
                        <img className="img" src={`./images/avatars/${username}.jpg`} alt={username}
                        onError={(e)=>{
                            e.target.src =`/images/avatars/default.png`;
                        }}
                        />
                    </Link>
                    <div className="userinfo">
                        <Link to={`${PATHS.PROFILE}/${username}`}>
                            <h3 className="username">{username}</h3>
                        </Link>
                        <p className="fullname">{fullName}</p>
                    </div>
                </div>
                <div className="followbtns" >
                    {!follow?
                    <button className="follow" onClick={followHandler} >follow</button>
                    :
                    <button className="following" onClick={()=>{setOverlayState(true)}}>following</button>
                    }
                </div>
                
                <Unfollow overlayState={overlayState} setOverlayState={setOverlayState}
                username={username} unfollowHandler={unfollowHandler} />
            </div>)

}

export default SuggestedProfile;