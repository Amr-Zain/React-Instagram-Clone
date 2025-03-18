import React from "react"
import { getProfilPhotos } from '../../services/firebase'
import {nanoid} from "nanoid"
import Image from "./image";
function Photos({userId}){

    const [profilePhotos,setProfilePhotos] = React.useState(null);

    React.useEffect(()=>{
        async function get(){
            const images = await getProfilPhotos(userId);
            setProfilePhotos(images);
        }
        if(userId){
            get();
        }
    },[userId])


    const images = profilePhotos?.map((photo)=>{
        return <Image key={photo.dicId} {...photo} />
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
