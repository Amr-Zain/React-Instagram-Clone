import React, { useCallback } from 'react';
import Header from './Header';
import Image from "./Image";
import Activites from "./Activites";
import PostInfo from './PostInfo';
import AddComment from './AddComment';
import PostWithComments from "./PostWithComments";
import { triggleLike, getAllPostComments } from '../../services/firebase';
import * as ACTIONS from '../../constants/postActions'

function reducer(state, action) {
  switch(action.type) {
    case ACTIONS.VIEW_COMMENTS:
      return { ...state, viewComments: action.value };
    case ACTIONS.TOGGLE_LIKE:
      return { 
        ...state, 
        likesNumberState: state.likesNumberState + action.value, 
        liked: !state.liked 
      };
    case ACTIONS.SET_NEW_COMMENT:
      return { ...state, newComment: action.value };
    case ACTIONS.SET_COMMENT_TYPE:
      return { ...state, commentType: action.value };
    case ACTIONS.UPDATE_COMMENTS_COUNT:
      return { ...state, commentsCount: state.commentsCount + action.value };
    case ACTIONS.SET_COMMENTS:
      return { ...state, comments: action.value };
    case ACTIONS.SET_ACTIVE_COMMENTS:
      return { ...state, activeUserComments: action.value };
    default: 
      return state;
  }
}

// Initial state
const initialState = {
  viewComments: false,
  likesNumberState: 0,
  liked: false,
  newComment: '',
  commentType: { isReply: false, replyDocId: '' },
  commentsCount: 0,
  comments: [],
  activeUserComments: []
};

function Post({ photo, userData }) {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    likesNumberState: photo.likes.length,
    liked: photo?.didLike,
    commentsCount: photo.comments
  });
  const dispatcher = useCallback(action=>dispatch(action),[]);
  const commentField = React.useRef(null);

  // Derived values
  const { docId, username, imageSrc, caption, dateCreated } = photo;
  const { userId: currentUserId, docId: currentUserDocId, username: currentUsername } = userData || {};

  // Fetch comments effect
  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getAllPostComments(currentUserId, docId, state.commentsCount);
        dispatcher({ type: ACTIONS.SET_COMMENTS, value: comments });
        
        const userComments = comments
          .filter(comment => comment.username === currentUsername)
          .map(({ username, text, docId }) => ({ username, text, docId }));
        
        dispatcher({ type: ACTIONS.SET_ACTIVE_COMMENTS, value: userComments });
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (currentUserId && state.commentsCount > 0) {
      fetchComments();
    }
  }, [docId, state.commentsCount, currentUserId, currentUsername, dispatcher]);

  
  const handleDoubleClick = (event) => {
    switch (event.detail) {
    case 1: {
        break;
    }
    case 2: {
        triggleLike(photo.docId,userData?.userId,state.liked)
        dispatcher({type:ACTIONS.TOGGLE_LIKE,value:state.liked?-1:1})
    break;
    }
    default: {
    break;
    }
}}

  const handleCommentIconClick = React.useCallback(() => {
    dispatcher({ type: ACTIONS.VIEW_COMMENTS, value: true });
    dispatcher({ 
      type: ACTIONS.SET_COMMENT_TYPE, 
      value: { isReply: false, replyDocId: '' } 
    });
  }, [dispatcher]);

  return (
    <>
      <div className="post" key={docId}>
        <Header 
            username={username} 
            imgUserDocId={photo.imgUserDocId} 
            imgUserId={photo.userId}
            userId={currentUserId} 
            userDocId={currentUserDocId} 
        />

        <Image src={imageSrc} handleClick={handleDoubleClick} />
        
        <Activites 
            didLike={photo?.didLike} 
            imgDocId={docId} 
            userId={currentUserId} 
            liked={state.liked} 
            setLiked={dispatcher}
            commentIcomClick={handleCommentIconClick}
        />

        <PostInfo 
            username={username} 
            caption={caption}
            commentsLen={state.comments.length} 
            setViewComments={dispatcher}
            dateCreated={dateCreated} 
            likesNumberState={state.likesNumberState}
            userComments={state.activeUserComments}
        />    
        
        <AddComment 
            loggedinUsername={currentUsername} 
            imgDocId={docId}
            newComment={state.newComment} 
            dispatcher={dispatcher} 
            inputRef={null} 
            commentType={state.commentType}
        />
      </div>
      
      {state.viewComments && (
        <PostWithComments 
            photo={photo}
            userData={userData}
            inputRef={commentField}
            userDocId={currentUserDocId} 
            {...state} 
            dispatcher={dispatcher}
        />
      )}
    </>
  );
}

export default React.memo(Post);