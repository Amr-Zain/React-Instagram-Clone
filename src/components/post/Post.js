import Header from './Header'
import Image from "./Image";
import Activites from "./Activites";
import React from 'react';
import PostInfo from './PostInfo';
import AddComment from './AddComment';
import PostWithComments from "./PostWithComments"
import { triggleLike,getAllPostComments }  from '../../services/firebase'
function reduce(state , action){
    
    switch(action.type){
        case'viewComments':
            return {...state,viewComments:action.value}
        /* case'likesNumberState':
            return {...state,likesNumberState:state.likesNumberState +action.value } */
        case'liked':
            return {...state,likesNumberState:(state.likesNumberState + action.value), liked:!state.liked }
        case'newComment':
            return {...state,newComment:action.value }
            case'commentType':
                return {...state,commentType :action.value }
        case'commentsCount':
        return {...state,commentsCount:state.commentsCount+action.value }
        case'comments':
            return {...state,comments:action.value }
        case 'activeUserComments':
            return {...state,activeUserComments:action.value }
        default: return state
        }

}
function Post({photo,userData}){
    //console.log('post');
    const initialState = {
        viewComments:false,
        likesNumberState: photo.likes.length,
        liked: photo?.didLike,
        newComment: '',
        commentType: {isReply:false,replyDocId:''},
        commentsCount: photo.comments,
        comments: [],
        activeUserComments:[],
        userLikedIds:photo.likes
    }
    
    const [state,dispatcher] = React.useReducer(reduce,initialState)
    
    const commentField = React.useRef(null);

    React.useEffect(()=>{
        function getPhotos(){
            getAllPostComments(userData?.userId,photo.docId,state.commentsCount).then((respose)=>{
                dispatcher({type:'comments',value:respose});
                let userComments = respose.filter(comment=>comment.username === userData?.username).map(comment=>{
                    return {username:comment.username,text:comment.text,docId:comment.docId}
                });
                //console.log(userComments)
                dispatcher({type:'activeUserComments',value:userComments});
            }).catch(e=>{
                console.log(e);
            })
        }

        if(userData?.userId && state.commentsCount>0){
            getPhotos();
        }
    },[state.commentsCount]);




    const handleClick = React.useCallback( (event) => {
        switch (event.detail) {
        case 1: {
            break;
        }
        case 2: {
            triggleLike(photo.docId,userData?.userId,state.liked)
            dispatcher({type:'liked'})
        break;
        }
        default: {
        break;
        }
    }},[])
    const commentIcomClick = React.useCallback(()=>{
        dispatcher({type:'viewComments',value:true});
        dispatcher({type:'commentType',value:{isReply:false,replyDocId:''}})
    },[])
    //console.log(state.activeUserComments)
    return (
        <>
            <div className="post" key ={photo.docId}>
                <Header username ={photo.username} imgUserDocId={photo.imgUserDocId} imgUserId={photo.userId} //wonner of the photo
                userId ={userData?.userId} userDocId={userData.docId} /> 

                <Image  src={photo.imageSrc} handleClick={handleClick} />
                
                <Activites didLike ={photo?.didLike} 
                                    imgDocId ={photo?.docId} 
                                    userId ={userData?.userId} liked={state.liked} setLiked ={dispatcher}
                                    commentIcomClick={commentIcomClick}
                />

                <PostInfo username ={photo.username} caption={photo.caption}
                        commentsLen={state.comments.length} setViewComments={dispatcher}
                        dateCreated={photo.dateCreated} likesNumberState={state.likesNumberState}
                        userComments={state.activeUserComments}
                />    
                <AddComment loggedinUsername={userData?.username} imgDocId = {photo.docId}
                newComment={state.newComment}dispatcher={dispatcher} inputRef={null} commentType={state.commentType}/>
            </div>
            {
                state.viewComments && <PostWithComments photo={photo}userData={userData}inputRef={commentField}
                                        userDocId={userData.docId} {...state} dispatcher={dispatcher}/>
            }
        </>)
}
export default Post;

