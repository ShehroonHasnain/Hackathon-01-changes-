import React, { useEffect, useState } from 'react'
import "./CommentsPopup.css"
import { addComment, createComment, deleteComment, getComments } from '../../redux/slices/commentSlice'
import { useDispatch, useSelector } from 'react-redux'


export default function CommentsPopup(props) {
    const user = useSelector(state=>state.authSlice.user)
    const comment = useSelector(state=>state.commentSlice.comment)
const note = props?.note
const [content, setContent] = useState("");

const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getComments())

  }, [])

  //handle to delete post
  const handleDelete = (id) => {
    console.log("Delete clicked", id);
    // dispatch
    dispatch(deleteComment(id))
  }



    const addCommentHandler = ()=>{
        let commentCreateData = {
            uid: user.uid,
            userName: user.name,
            userProfileURL: user.profileURL,
            content,
            noteUid:props?.noteUid,
            createdAt: new Date(),
           

        }
          
                dispatch(createComment({ ...commentCreateData }))
                
                setContent("")
               
              
    }

    const HandleClick = ()=>{
        props.setCommentState(false)
    }


  return (
    <div className='modalBackground'>
    <div className='modalContainer'>
    <div className="form-container">
              <h1>Comments on this notes</h1>
{comment?.map((comment)=>{
    return(
    <div className='userProfile'>
        <img src={comment?.userProfileURL} alt="" />
        <span>
          <p>{comment?.userName}</p>
          <p id="date">created at:
            {comment?.createAt?.seconds ? new Date(comment?.createAt?.toDate()).toLocaleDateString() : new Date(comment?.createAt).toLocaleDateString()}
          </p>
        </span>
        <div><p>{comment?.content}</p></div>
        <button onClick={handleDelete}>del</button>
        </div>

    )
})}
              <div>
              <label htmlFor="content">Content</label>
              <textarea value={content} placeholder="Type here..." onChange={(e) => setContent(e.target.value)} id="content" />
                <button onClick={addCommentHandler} className='simple-btn'>Add</button>
              </div>
              <button onClick={HandleClick} className='simple-btn-o'>Close</button>
          </div>
      
    </div>
  </div>

  )
}
