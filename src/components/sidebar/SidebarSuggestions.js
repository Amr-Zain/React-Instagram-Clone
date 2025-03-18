import React from "react";
import { getSuggestedProfiles } from "../../services/firebase"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SuggestedProfile from "./SuggestedProfile";

function SidebarSuggestions(props){
    const [suggestedUsers,setSuggestedUsers] = React.useState(null);
    const [overlayState ,setOverlayState] = React.useState(false);

    React.useEffect(()=>{
        async function getPorfiles(){
            const profiles = await getSuggestedProfiles(props?.userId, props?.following)
            setSuggestedUsers(profiles)
        }
        if(props?.userId) getPorfiles()

    },[props?.following, props?.userId])
    React.useEffect(()=>{
        const listener =()=>{
            if(window.innerWidth<1024){
                setOverlayState(false);
            }}

        window.addEventListener('resize',listener);
        
        return ()=>window.removeEventListener("resize",listener);
    },[])
    
    const profiles = suggestedUsers?.map(user=>{
        return(<SuggestedProfile activeUserDocId={props?.userDocId} activeUserId= {props?.userId} key = {user.userId}
            fullName={user.fullName} suggDocId ={user.docId} suggUserId={user.userId}
            username={user.username} overlay={{overlayState ,setOverlayState}} />)
    })

    return ( <>{
    suggestedUsers?
    <>
        <div className="suggestedprofiles">
            <div className="Suggestions">Suggestions For You</div>
            {profiles}
        </div>
        <div className="over" style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '100vw',
                height: `100%`,
                backgroundColor: 'rgb(0 0 0 / 70%)',
                display:overlayState?'block':"none"
            }}></div>
    </>
    :
    <>
        <div style={{left:'0', margin:'2rem'}} >
            <div style={{display:'flex',gap:'1rem',margin:'1rem'}}>
                <Skeleton count={1} height={32} width={32} style={{borderRadius:'50%'}} />  
                <div>
                    <Skeleton count={1} height={8} width={100}  /> 
                    <Skeleton count={1} height={8} width={70}  /> 
                </div>
            </div>
            <div style={{display:'flex',gap:'1rem',margin:'1rem'}}>
                <Skeleton count={1} height={32} width={32} style={{borderRadius:'50%'}} />  
                <div>
                    <Skeleton count={1} height={8} width={100}  /> 
                    <Skeleton count={1} height={8} width={70}  /> 
                </div>
            </div>
            <div style={{display:'flex',gap:'1rem',margin:'1rem'}}>
                <Skeleton count={1} height={32} width={32} style={{borderRadius:'50%'}} />  
                <div>
                    <Skeleton count={1} height={8} width={100}  /> 
                    <Skeleton count={1} height={8} width={70}  /> 
                </div>
            </div>
            <div style={{display:'flex',gap:'1rem',margin:'1rem'}}>
                <Skeleton count={1} height={32} width={32} style={{borderRadius:'50%'}} />  
                <div>
                    <Skeleton count={1} height={8} width={100}  /> 
                    <Skeleton count={1} height={8} width={70}  /> 
                </div>
            </div>
            <div style={{display:'flex',gap:'1rem',margin:'1rem'}}>
                <Skeleton count={1} height={32} width={32} style={{borderRadius:'50%'}} />  
                <div>
                    <Skeleton count={1} height={8} width={100}  /> 
                    <Skeleton count={1} height={8} width={70}  /> 
                </div>
            </div>
            
        </div>
    </>
    
    }
    </>
    )
}

export default SidebarSuggestions;