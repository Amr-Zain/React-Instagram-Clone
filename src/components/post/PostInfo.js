import React from "react";
import {Link} from 'react-router-dom'
import useDateCreated from "../../hooks/useDateCreated";


function PostInfo({username,caption,commentsLen,setViewComments,dateCreated,likesNumberState,userComments,userLikedIds}){
    const createdText = useDateCreated(dateCreated);
    const UserComments = userComments?.map(comment=>{
        return (<div key={comment.docId} className="caption">
                    <p><span><Link to={`/profile/${comment.username}`}>{comment.username}</Link></span>{comment.text}</p>
                </div>)
    })
    return(
        <>
        <div className="post-likes">  
                <p>{likesNumberState === 1 ? `${likesNumberState} like` : `${likesNumberState} likes`}</p>
            </div>
            {
                caption &&<div className="caption">
                    <p><span><Link to={`/profile/${username}`}>{username}</Link></span>{caption}</p>
                </div>
            }
            {
            commentsLen > 1 &&
            <div className="view-comments" onClick={()=>{setViewComments(({type:'viewComments',value:true}))}}>
                {<p>View all {commentsLen} comments</p>}
            </div>
            }
            <div className="user-comments">
                {UserComments}
            </div>
            <div>

            </div>
            <div className="post-date">
                <p>{createdText}</p>
            </div>
        </>

    )
}

export default React.memo(PostInfo);