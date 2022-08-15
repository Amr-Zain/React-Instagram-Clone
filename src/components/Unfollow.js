import ReactDOM from 'react-dom'
import {PROFILE} from "../constants/Routes"
import {Link} from 'react-router-dom'


function Unfollow({overlayState,setOverlayState,username,unfollowHandler}){

    if(!overlayState)return null;
    return(
        ReactDOM.createPortal(
            (<>
                <div onClick={()=>setOverlayState(false)} className="over" style={{
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    zIndex:"250",
                    backgroundColor: 'rgb(0 0 0 / 60%)',
                    display: 'block'
                }}></div>
                <div className="overlay" style={{display: 'flex'}}>
                            
                            <Link className="profileimg" to ={`${PROFILE}/${username}`}>
                            <img 
                                src={`/images/avatars/${username}.jpg`}
                                alt='userimg'
                                onError={(e) => {
                                    e.target.src = `/images/avatars/default.png`;
                                    }}
                            />
                            </Link>
                            
                            <div>Unfollow @{username}?</div>
                            <div onClick={unfollowHandler}>
                                <button  className="unfollow">unfollow</button>
                            </div>
                            <div onClick={()=>{setOverlayState(false)}}>
                                <button  className="cancel">cancel</button>
                            </div>
                        </div>
            </>)
        ,document.getElementById('root3'))
    )
}

export default Unfollow;