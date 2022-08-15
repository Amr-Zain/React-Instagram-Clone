import usePhoto from "../hooks/usePhoto";
import ActiveUserDataContext from "../contexts/ActiveUserDataContext";
import React from "react";
import Post from './post/Post'
import '../styles/timeLine.css'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function TimeLine(){
    
  const userData = React.useContext(ActiveUserDataContext)
  
  const photos = usePhoto(userData?.userId,userData?.following);
  
  const posts =photos.map((photo)=>{
    return (<Post key ={photo.docId} photo ={photo} userData={userData} />)
    });

    return (
      <>
      {
        userData ?
          
          (
            posts.length>0?
            <div className="timeLine">
              {posts}
            </div>
            :
            <div> Follow some people to see posts</div>
          )
          :
          (
            <div>
              <div style={{backgroundColor:'white' , width:'470px',maxWidth:'90%',margin:'1rem auto',borderRadius:'.45rem'}}>
                <div style={{display:'flex',gap:'1rem',justifyContent:"flex-start",padding:'.8rem'}}>
                  <Skeleton count={1} height={32} width={32} style={{borderRadius:'50%'}} /> 
                  <div>
                    <Skeleton count={1} height={8} width={100}  /> 
                    <Skeleton count={1} height={8} width={70}  /> 
                  </div>
                </div>
                <div style={{width:'100%'}}>
                  <Skeleton count={1} height={400} /> 
                </div>
              </div>
              <div style={{backgroundColor:'white' , width:'470px',maxWidth:'90%',margin:'1rem auto',borderRadius:'.45rem'}}>
                <div style={{display:'flex',gap:'1rem',justifyContent:"flex-start",padding:'.8rem'}}>
                  <Skeleton count={1} height={32} width={32} style={{borderRadius:'50%'}} /> 
                  <div>
                    <Skeleton count={1} height={8} width={100}  /> 
                    <Skeleton count={1} height={8} width={70}  /> 
                  </div>
                </div>
                <div style={{width:'100%'}}>
                  <Skeleton count={1} height={400} /> 
                </div>
              </div><div style={{backgroundColor:'white' , width:'470px',maxWidth:'90%',margin:'1rem auto',borderRadius:'.45rem'}}>
                <div style={{display:'flex',gap:'1rem',justifyContent:"flex-start",padding:'.8rem'}}>
                  <Skeleton count={1} height={32} width={32} style={{borderRadius:'50%'}} /> 
                  <div>
                    <Skeleton count={1} height={8} width={100}  /> 
                    <Skeleton count={1} height={8} width={70}  /> 
                  </div>
                </div>
                <div style={{width:'100%'}}>
                  <Skeleton count={1} height={400} /> 
                </div>
              </div>
            </div>

          )
      }

  </>
          )
}
export default TimeLine;