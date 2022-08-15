import Header from './Header'
import { Link } from "react-router-dom";
import { PROFILE } from "../../constants/Routes";
import Comment from "./Comment";
import  "../../styles/postWithComments.css"
import PostInfo from './PostInfo';
import AddComment from './AddComment';
import Activites from "./Activites";
import useDateCreated from '../../hooks/useDateCreated';
import React from 'react';
import ReactDOM from 'react-dom'

const PostWithComments = ({photo,userData,dispatcher,comments,liked,likesNumberState,newComment,commentType,inputRef})=>{
    //console.log('PostWithComments');
    const dateCreated = useDateCreated(photo.dateCreated);
    const Comments = comments.map((comment)=>{
        return <Comment key ={comment.docId} {...comment}inputRef={inputRef} dispatcher={dispatcher} 
                activeUserUsername={userData?.username}activeUserUserId={userData?.userId} imgDocId={photo.docId}/>})

    const commentIcomClick = React.useCallback(()=>{
        dispatcher({type:'commentType',value:{isReply:false,replyDocId:''}})
        inputRef.current.focus();
    },[])

    return(ReactDOM.createPortal(
    <>
        <div className="post-cotainer"  >
        <svg onClick={()=>{dispatcher({type:'viewComments',value:false})}} style={{marginBottom:'.5rem'}} aria-label="Close" className="fg7vo5n6 lrzqjn8y" color="#ffffff" fill="#ffffff" height="18" 
        role="img" viewBox="0 0 48 48" width="18"><title>Close</title>
        <path clipRule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 
        1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 
        24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 
        0l1.4 1.4c.6.6.6 1.6 0 2.2z" fillRule="evenodd"></path></svg>
            <div className="post-comments">

                <div className="post-image">
                    <div>
                        <img src={photo.imageSrc}  alt='lifelineImage'/>
                    </div>
                </div>
                
                <div className="comments-footer">
                    <div className="all-comments">
                        
                        <Header username ={photo.username} imgUserDocId={photo.imgUserDocId} imgUserId={photo.userId} 
                        userId ={userData?.userId} userDocId={userData.docId} />
                        
                        <div className="comments">
                        {
                            photo.caption && <div className="post-caption">
                                            <Link to ={`/${PROFILE}/${photo.username}`}>
                                                <img src={`./images/avatars/${photo.username}.jpg`} alt={photo.username} 
                                                onError={(e)=>{
                                                    e.target.src ="./images/avatars/default.png"
                                                }}/>
                                            </Link>
                                            <div>
                                                <p>
                                                    <span className="username">
                                                        <Link to={`/${PROFILE}/${photo.username}`}>
                                                            {photo.username} 
                                                        </Link>
                                                    </span>
                                                    {photo.caption}
                                                </p>
                                                <div className="date">
                                                    <span >
                                                        {dateCreated}
                                                    </span>
                                                </div>
                                                
                                            </div>
                                        </div>
                        }
                            {Comments}
                        </div>
                    </div>
                    <footer className="footer">
                                        <Activites didLike ={photo?.didLike} 
                                            imgDocId ={photo?.docId}
                                            userId ={userData?.userId} liked={liked} setLiked ={dispatcher}
                                            commentIcomClick={commentIcomClick}
                                            />
                                        <PostInfo username ={photo.username} caption={null}
                                                    commentsLen={0} setViewComments={null}
                                                    dateCreated={photo.dateCreated} likesNumberState={likesNumberState}
                                                    userComments ={null}
                                                    />  
                                        <AddComment loggedinUsername={userData?.username} imgDocId = {photo.docId}
                                            newComment={newComment} dispatcher={dispatcher} inputRef={inputRef}
                                            commentType={commentType}/>
                    </footer>
                </div>

        </div>

        </div>
        <div onClick={()=>{dispatcher({type:'viewComments',value:false})}} className="over" style={{
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    zIndex:"200",
                    backgroundColor: 'rgb(0 0 0 / 60%)',
                    display:'block'
                }}></div>
        
    </>
        ,document.getElementById('root2'))
)
}
export default PostWithComments;