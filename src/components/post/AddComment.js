import React from "react";
import { createComment , createReply}  from '../../services/firebase'

function AddComment({loggedinUsername,imgDocId,inputRef,newComment,dispatcher,commentType}){
    //console.log('addComment');
    const PostComment = async (e)=>{
        e.preventDefault();

        if(commentType.isReply){
            //console.log(commentType.replyDocId);
            await createReply(loggedinUsername,newComment,commentType.replyDocId);
        }else {
            await createComment(loggedinUsername,newComment,imgDocId);
        }
        dispatcher({type:'commentsCount',value:1})
        dispatcher({type:'newComment',value:""});
    }
    return (
        <form
                className="add-comment"
                method="POST"
                onSubmit={(event) =>
                    newComment.length > 0 ? PostComment(event) : event.preventDefault()
                }
            >
                <input 
                    type='text'
                    placeholder='add a comment'
                    value = {newComment}
                    onChange={(e)=>dispatcher({type:'newComment',value:e.target.value})}
                    ref = {inputRef}
                />
                <button 
                    disabled={newComment.length === 0} 
                    onClick={PostComment} 
                    style={{opacity:newComment.length === 0 ?"30%":"100%"}}
                >
                    Post
                </button>

            </form>
    )
}

export default React.memo(AddComment);