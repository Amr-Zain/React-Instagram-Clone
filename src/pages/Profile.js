import React from "react";
import Header from "../components/profile/Header";
import Photos from "../components/profile/Photos";
import { getUserByUsername } from '../services/firebase';
import { useParams } from "react-router-dom"
import '../styles/profile.css'
import {useNavigate} from "react-router-dom"
import { NOT_FOUND } from "../constants/Routes"
function Profile(){
    const {username} = useParams();
    
    const [profileData,setProfileData] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(()=>{
        async function get(){
            const respose = await getUserByUsername(username);
            if(respose){
                setProfileData(respose);
            }else{
                //this username not exist
                navigate(NOT_FOUND);
                return;
            }
            
        }
        if(username){
            get();
        }
    },[navigate, username])
    
    
    
    return (
        <>
        <div className="profile">
            <div className="profile-container">
                <Header {...profileData} />
                <Photos userId ={profileData?.userId}/>
            </div>
        </div>
        </>
    )
}
export default Profile;