import ActiveUserDataContext from "../../contexts/ActiveUserDataContext";
import React from "react";
import {updateFollowing , updateFollowers} from '../../services/firebase';
import Unfollow from "../Unfollow";
import { LOGIN } from "../../constants/Routes";
import { useNavigate } from 'react-router-dom'
function Header({userId,username,fullName,following,followers,photos,docId}){
    const [isFollowing,setIsFollowing] = React.useState(false);
    const [overlayState,setOverlayState] = React.useState(false);
    const [followersCount,setFollowersCount] = React.useState();
    const activeUserData = React.useContext(ActiveUserDataContext);
    const navigate = useNavigate();

    
    const isTheActiveUserProfile = activeUserData && userId ? 
        activeUserData?.userId === userId 
        :
        false;

    React.useEffect(()=>{
        if(! isTheActiveUserProfile){
            if(activeUserData?.following.includes(userId)){
                setIsFollowing(true);
            }
        }
    },[activeUserData?.following, isTheActiveUserProfile, userId])


    React.useEffect(()=>{
        setFollowersCount(followers?.length)
        
    },[followers])

    let isProfileFollowingActiveUser = false;
    if(!isTheActiveUserProfile){
        if(following?.includes(activeUserData?.userId)){
            isProfileFollowingActiveUser = true;
        }
    }
    async function unfollowHandler(){
            await updateFollowing(activeUserData.docId,userId,true);
            await updateFollowers(docId,activeUserData.userId,true);
            setIsFollowing(false);
            setOverlayState(false);
            setFollowersCount(prv=>prv-1);
    }
    const followHandler =async()=>{
        if(activeUserData){
            await updateFollowing(activeUserData.docId,userId,false);
            await updateFollowers(docId,activeUserData.userId,false);
            setIsFollowing(true);
            setFollowersCount(prv=>prv+1);
        }else{
            navigate(LOGIN)
        }                                               
    }
    
    return (
        <div className="profile-header" >
            <div className="main-info">
                <div className="profile-img">
                    <img 
                        src={`/images/avatars/${username}.jpg`}
                        alt='profileImg'
                        onError={(e) => {
                            e.target.src = `/images/avatars/default.png`;
                            }}
                    />
                </div>
                <div>
                    <div className="profile-info">
                        <div className="user-info">
                            <h3 className="username">{username}</h3>
                            <div>
                                {
                                    !isTheActiveUserProfile?
                                    <>
                                        {
                                            isFollowing ?
                                                <button 
                                                className="following"//onClick put overlay
                                                onClick={()=>{setOverlayState(true)}}
                                                >
                                                    <svg style={{cursor:'pointer'}} aria-label="Following" className="_ab6-" color="#262626" fill="#262626" height="15" role="img" viewBox="0 0 95.28 70.03" 
                                                    width="20"><path d="M64.23 69.98c-8.66 0-17.32-.09-26 0-3.58.06-5.07-1.23-5.12-4.94-.16-11.7 8.31-20.83 
                                                    20-21.06 7.32-.15 14.65-.14 22 0 11.75.22 20.24 9.28 20.1 21 0 3.63-1.38 5.08-5 5-8.62-.1-17.28 0-25.98 
                                                    0zm19-50.8A19 19 0 1164.32 0a19.05 19.05 0 0118.91 19.18zM14.76 50.01a5 5 0 01-3.37-1.31L.81 39.09a2.5 2.5 0 
                                                    01-.16-3.52l3.39-3.7a2.49 2.49 0 013.52-.16l7.07 6.38 15.73-15.51a2.48 2.48 0 013.52 0l3.53 3.58a2.49 2.49 0 010 
                                                    3.52L18.23 48.57a5 5 0 01-3.47 1.44z"></path></svg>
                                                </button>
                                            :
                                                <button className="not-following"
                                                    onClick={followHandler}>
                                                    <p>
                                                    {isProfileFollowingActiveUser ? "Follow Back":"Follow"}
                                                    </p>
                                                </button>
                                            
                                        }
                                        
                                    </>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        <div className="user-follow"> 
                            <div><span>{photos}</span> posts</div>
                            <div><span>{followersCount}</span> followers</div>
                            <div><span>{following?.length}</span> following</div>
                        </div>
                        <h4 className="full-name">{fullName}</h4>
                    </div>
                </div>
            </div>
                <h4 className="full-name-col">{fullName}</h4>
                <div className="user-follow-col"> 
                            <div><span>{photos}</span> <h3>posts</h3></div>
                            <div><span>{followersCount}</span> <h3>followers</h3></div>
                            <div><span>{following?.length}</span> <h3>following</h3></div>
                </div>
                <Unfollow overlayState={overlayState} setOverlayState={setOverlayState}
                    username={username} unfollowHandler={unfollowHandler} />
            </div>)

}
export default Header;
