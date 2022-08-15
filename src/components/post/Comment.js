import {Link} from "react-router-dom"
import {PROFILE} from '../../constants/Routes'
import React from "react"
import {triggleCommentLike , getReplies}from "../../services/firebase"
import Reply from './Reply'
import useDateCreated from "../../hooks/useDateCreated"
import { deleteCommentDoc } from '../../services/firebase'
import DeleteComment from './deleteComment'

function Comment({text,username,didLike,likes,docId,activeUserUserId,replies,
                    dateCreated,inputRef,dispatcher,activeUserUsername,imgDocId}){

    //console.log('Comment');
    
    const [liked,setLiked] = React.useState(didLike);
    const [repliesCount,setRepliesCount] = React.useState(replies);
    const [likesNumberState,setLikesNumberState] = React.useState(likes.length);
    const [viewReplies,setViewReplies] = React.useState(true);
    const [repliesComments,setRepliesComments] = React.useState([]);
    const [overlayState,setOverlayState] = React.useState(false);
    const likeHandler = ()=>{
        console.log(activeUserUserId)
        triggleCommentLike(docId,activeUserUserId,liked);
        setLiked(prv=>!prv);
        setLikesNumberState((n)=>{return liked? n-1 :n+1});
    }
    
    function replyHandler(){
        inputRef.current.value = `@${username} `;
        dispatcher({type:'newComment', value:`@${username} `});
        dispatcher({type:'commentType', value:{isReply:true,replyDocId:docId}});
        inputRef.current.focus();
    }
    async function deleteComment(){

        await deleteCommentDoc(docId,imgDocId,repliesComments);
        dispatcher({type:'commentsCount',value:-1});
        dispatcher({type:'commentType',value:{isReply:false,replyDocId:''}});
    }
    
    React.useEffect(()=>{
        async function get(){
            const R  = await getReplies(docId,activeUserUserId,repliesCount+1);
            setRepliesComments(R);
        }
        if(replies>0){
            get();
        }
        
    },[replies])
    const createdText = useDateCreated(dateCreated);
    
    const Replies = repliesComments?.map((reply)=>{
        console.log(reply);

        return <Reply key ={reply.docId} {...reply}activeUserUsername={activeUserUsername}commentDocId={docId}
        activeUserUserId={activeUserUserId}inputRef={inputRef}dispatcher={dispatcher} setRepliesCount={setRepliesCount}/>
    })

        return (
            <>
            <div className="comment">
                <div>
                    <div className="user-comment">
                        <Link className="user-img" to ={`/${PROFILE}/${username}`}>
                            <img src={`./images/avatars/${username}.jpg`} alt={username} 
                            onError={(e)=>{
                                e.target.src ="./images/avatars/default.png"
                            }}/>
                        </Link>
                        <div className="comment-details">
                            <div className="comment-text">
                                                <span className="username">
                                                    <Link to={`/${PROFILE}/${username}`}>
                                                        {username} 
                                                    </Link>
                                                </span>
                                                    {text}
                            </div>
                            <div className="details">
                                <span className="date">
                                    {createdText}
                                </span>
                                <span className="likes">{likesNumberState === 1 ? `${likesNumberState} like` : `${likesNumberState} likes`}</span>
                                <span onClick={replyHandler} className="reply">reply</span>
                                <div className=" delete-comment">
                                    <svg onClick={()=>setOverlayState(true)}style={{cursor:'pointer'}} aria-label="More options" className="_ab6-" color="rgb(142, 142, 142)" fill="rgb(142, 142, 142)" height="20" 
                                        role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5">
                                        </circle><circle cx="6" cy="12" r="1.5"></circle>
                                        <circle cx="18" cy="12" r="1.5"></circle>
                                    </svg>
                                </div>
                            </div>
                            {
                            repliesCount > 0 &&
                                    <div className="replies"   onClick={()=>setViewReplies(prv=>!prv)}>
                                        {
                                        viewReplies ?<>
                                                <div className="line">
                                                </div>
                                            <p className="view-replies" >
                                                View replies ({replies})
                                            </p>
                                        </>
                                            :<>
                                                    <div className="line">
                                                        &nbsp;
                                                    </div>
                                                <p className="view-replies"  >
                                                    Hide replies
                                                </p>
                                            </>
                                        }
                                        
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="like">
                {
                        liked?
                        <svg onClick={likeHandler} style={{cursor:'pointer'}} aria-label="Unlike" className="_ab6-" color="#ed4956" fill="#ed4956" height="12" 
                        role="img" viewBox="0 0 48 48" width="12"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 
                        5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 
                        1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 
                        1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                        :
                        <svg onClick={likeHandler} style={{cursor:'pointer'}} aria-label="Like" className="_ab6-" color="#262626" fill="#262626" height="12" 
                        role="img" viewBox="0 0 24 24" width="12">
                            <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 
                            4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 
                            14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 
                            1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 
                            6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 
                            5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 
                            45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 
                            6.985 0 00-6.708-7.218z"></path></svg>
                }
                </div>
                
            </div>
                <div className="comment-replies">
                    {
                        !viewReplies && Replies
                    }
                </div>
                {overlayState && <DeleteComment activeUserUsername={activeUserUsername} username={username} 
                                    deleteComment={deleteComment} setOverlayState={setOverlayState}/>}
            </>)
    
}
export default React.memo(Comment);
        