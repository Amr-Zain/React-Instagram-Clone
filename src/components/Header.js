import React from "react";
import ActiveUserDataContext from '../contexts/ActiveUserDataContext';
import FirebaseContext from '../contexts/firebase'
import { Link , useNavigate} from 'react-router-dom'
import * as PATHS from '../constants/Routes'
import '../styles/header.css'

import { signOut } from "firebase/auth";
function Header(){

    const { auth } = React.useContext(FirebaseContext);
    const navigate = useNavigate();
    //const user =  auth.currentUser;
    /* if(user){
        
    } */
    const userData = React.useContext(ActiveUserDataContext);
    
    
    return (<header>
                <div className="header-container">
                    <div className="logo ">
                            <Link  to={PATHS.HOME} >
                                <img style={{width: '100%'}}  className="insta-logo" src="/images/logo.png" alt="Instagram" />
                            </Link>
                    </div>
                    <div className="user">
                        {userData ? (
                        <>
                            <Link className="home"to={PATHS.HOME}>
                            <svg aria-label="Home" className="_ab6-" color="#262626" fill="#262626" 
                                height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 
                                10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 
                                01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 
                                01.31.724V22a1 1 0 01-1 1z"></path></svg>
                                
                            </Link>
                                
                            <button
                                className="signout"
                                onClick={() => {
                                    signOut(auth).then(() => {
                                        navigate(PATHS.LOGIN);
                                    }).catch((e) => {
                                    console.log(e);
                                    });
                                }}
                            >
                                
                                <img src="/images/logout.svg" alt="logout"/>    
                            </button>

                            
                                        <div className="user-profile">
                                            <Link to={`/profile/${userData?.username}`}>
                                                <img
                                                    src={`https://raw.githubusercontent.com/Amr-Zain/React-Instagram-Clone/master/public/images/avatars/${userData?.username}.jpg`}
                                                    alt={`${userData?.username}`}
                                                    onError={(e) => {
                                                    e.target.src = `https://raw.githubusercontent.com/Amr-Zain/React-Instagram-Clone/master/public/images/avatars/default.png`;
                                                    }}
                                                />
                                            </Link>
                                        </div>
                        </>

                        ):(<>
                                <Link to={PATHS.LOGIN}>
                                    <button
                                        className="login"
                                    >
                                        Log In
                                    </button>
                                </Link>
                                <Link to={PATHS.SIGN_UP}>
                                    <button
                                        className="signup"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                
            </header>)
}
export default Header;


