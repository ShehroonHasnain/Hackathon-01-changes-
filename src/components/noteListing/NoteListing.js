import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteNote, getNotes , updateDocId} from '../../redux/slices/noteSlice'
import "./NoteListing.css"
import CommentsPopup from '../comments/CommentsPopup'

export default function NoteListing() {
  const note = useSelector(store => store.noteSlice.note)
  const user = useSelector(store => store.authSlice.user)


  // console.log('user details', user);
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getNotes())

  }, [])

  //handle to delete post
  const handleDelete = (id) => {
    console.log("Delete clicked", id);
    // dispatch
    dispatch(deleteNote(id))
  }

  //handle to update/edit post
  const handleEdit = (id) => {
    console.log("Edit clicked", id);
    // dispatch
    dispatch(updateDocId(id))
  }

const [commentState,setCommentState]=useState(false)
const CommentHandler =()=>{
  setCommentState(true)
}

  return (

    <div className='feedlisting-container'>
      <h1 style={{textAlign:"center",backgroundColor:"rgb(66, 66, 239)", color:"white"}}>Saved Notes</h1>
   {
        note?.map((note) => {
          return (

            <div key={note?.id} className='feedlisting-items'>
              <div className='userProfile'>
                <img src={note?.userProfileURL} alt="" />
                <span>
                  <p>{note?.userName}</p>
                  <p id="date">created at:
                    {note?.createAt?.seconds ? new Date(note?.createAt?.toDate()).toLocaleDateString() : new Date(note?.createAt).toLocaleDateString()}
                  </p>
                </span>
                

              </div>
              <div><h3>Subject:{note?.subject}</h3></div>
              <div key={note?.id} className='titleDesc'>

                <h3>{note?.title}</h3>
                <p>{note?.content}</p>
              </div>
              
              <img src={note?.imageURL} style={{ width: "60%", height:"60%", }} />
              <br />
              <div class="edit-user">
                  <p><strong>created by:</strong>{note?.createdBy}</p>
                  <p><strong>last edit by:</strong>{note?.lastEditBy}</p>
                  <p><strong>last edit at:</strong>{note?.lastEditAt?.seconds ? new Date(note?.createAt?.toDate()).toLocaleDateString() : new Date(note?.createAt).toLocaleDateString()}</p>
                </div>
                <div>
                  { commentState && <CommentsPopup id={note?.id} note={note} commentState={commentState} setCommentState={setCommentState} />}
                  <button onClick={CommentHandler} className='comment-cle'> Comments </button>
                 
                </div>
                  <hr style={{border:"1px solid black"}}/>
                  
              <div className='btn-cl'> 
                <button className='del-btn' onClick={() => handleDelete(note.id, note.uid)}>delete</button>
                <button className="edit-btn"onClick={() => handleEdit(note.id)}>edit</button>
              </div>
              <hr />


            </div>

          )
        })
      }

    </div>

    

  )
}
