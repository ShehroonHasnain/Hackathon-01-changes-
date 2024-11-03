
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateNotesSchema } from './CreateNotesSchema';
import { createNote, updateNote } from '../../redux/slices/noteSlice';
import "./CreateNotes.css"

export default function CreateNotes() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false)
    const [subject, setSubject] = useState('')
    const [file, setFile] = useState('')

    const note = useSelector(state => state.noteSlice.updateNote)
    // console.log('note',note);

    const user = useSelector(state => state.authSlice.user)
    // console.log('user in createNote', user);
    const dispatch = useDispatch()

    useEffect(()=>{
        if (note) {
            setTitle(note.title)
            setContent(note.Content)
            setSubject(note.subject)

        } else {
            setTitle("")
                setContent("")
                setSubject("")
                setFile("")
        }
    },[note])

     //     //create post handler
     const createNoteHandler = async () => {
        let noteCreateData = {
            uid: user.uid,
            userName: user.name,
            userProfileURL: user.profileURL,
            title,
            content,
            subject,
            createdAt: new Date(),
            createdBy: user.name,
            lastEditBy: user.name,
            lastEditAt: new Date(),

        }
        let noteUpdateData = {
            uid: user.uid,
            userName: user.name,
            userProfileURL: user.profileURL,
            title,
            content,
            subject,
            lastEditBy: user.name,
            lastEditAt: new Date(),
        }

        const data = {
            title,
            content,
            subject,
            file,
        }
        // console.log('data', data);
        try {
            const response = await CreateNotesSchema.validate(data)
            if (response) {
                 if (note) {
                        dispatch(updateNote({ ...noteUpdateData, id: note.id }))
                        return
                    }
                dispatch(createNote({ ...noteCreateData, file, setLoading }))
                setTitle("")
                setContent("")
                setSubject("")
                setFile("")
            } else {
                console.log('there is error');
            }
        } catch (error) {
            alert('Please fill required field correctly')
        }
    }

      // imgURL handler
      const changeImage = async (e) => {
        console.log("e", e.target.files[0]);
        const file = e.target.files[0];
        setFile(file)
    }


  return (
    
 <div className='createpost-container'>
                <div className="create-post-container">
                    <h2>Create Notes</h2>
                    <div className="create-post-form">

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input value={title} type="text" onChange={(e)=> setTitle(e.target.value)} placeholder="Title" id="title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea value={content} placeholder="Content" onChange={(e) => setContent(e.target.value)} id="content" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <textarea value={subject} placeholder="subject" onChange={(e) => setSubject(e.target.value)} id="subject" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">Choose File</label>
                            <input onChange={changeImage} type="file" id="file" />
                        </div>
                        <div className='btn-class'>{loading ? <p>Loading...</p> :
                            <button onClick={createNoteHandler} className="submit-button">{note ? "Update Note" : "Create Note"}</button>}
                            </div>
                    </div>
                </div>
            </div >
  )
}
