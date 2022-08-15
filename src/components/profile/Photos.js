import React from "react"
import { getProfilPhotos } from '../../services/firebase'
import {nanoid} from "nanoid"
function Photos({userId}){

    const [profilePhotos,setProfilePhotos] = React.useState(null);

    React.useEffect(()=>{
        async function get(){
            const images = await getProfilPhotos(userId);
            setProfilePhotos(images);
            //console.log(profilePhotos)
        }
        if(userId){
            get();
        }
    },[userId])


    const images = profilePhotos?.map((photo)=>{
        return(
            <div key={photo?.dicId}className="img-container">
                <div className="el"></div>
                    <div  className ="photo">
                        <div className="over">  </div>
                        <div className="icons">
                            <div>
                            <svg  style={{fill:'white'}} aria-label="Unlike" className="_ab6-" color="#ed4956" fill="#ed4956" height="24" 
                                role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 
                                1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 
                                16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 
                                1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                <span>{photo?.likes.length}</span>
                            </div>
                            <div>
                            <svg style={{color:'white'}} aria-label="Comment" className="_ab6-" color="#262626" fill="#262626" height="24" 
                                role="img" viewBox="0 0 24 24" width="24">
                                    <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" 
                                    fill="none" stroke="currentColor" strokeLinejoin="round" 
                                    strokeWidth="2"></path></svg>
                                <span>{photo?.comments}</span>
                            </div>
                        </div>
                        <img src={photo?.imageSrc} alt='userimg'/>
                    </div>
            </div>
        )
    })
    let photosElements= []
    
        for(let i =0;i<profilePhotos?.length;i+=3){
            const group =
                        <div key={nanoid()} className="photos-row">
                            {images[i]}
                            {images[i+1]}
                            {images[i+2]}
                        </div>
            photosElements.push(group);
        }
  

    return(
        <div className="profile-photos">
            {
                photosElements.length<1?
                <p className="no-photos">No Posts Yet</p>:
                photosElements
            }
        </div>
    )
}
export default Photos;
