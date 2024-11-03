import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, onSnapshot, query, where, orderBy, limit, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";




//delete note
export const deleteNote = createAsyncThunk("note/deleteNote",
    async (id) => {
        try {
            const docRef = doc(db, "notes", id)
            await deleteDoc(docRef)
            return id
        } catch (error) {
            console.log("error", error);

        }
    }
)

// get notes
export const getNotes = createAsyncThunk("note/getNotes", async () => {
    try {
        const collectionRef = collection(db, "notes");
        const queryRef = query(collectionRef);
        const docs = await getDocs(queryRef);
        let data = [];
        docs.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching notes:", error);
        
    }
});


//update note
export const updateNote = createAsyncThunk("note/updateNote",
    async (note) => {
        try {
            const docRef = doc(db, "notes", note.id)
            await updateDoc(docRef, note)
            return note
        } catch (error) {
            console.log("error", error);

        }
    }
)

// create note
export const createNote = createAsyncThunk(
    "note/createNote",
    async (note) => {

        try {
            note.setLoading(true)
            const file = note.file
            console.log("file", file);
            
            // file referece
            const fileRef = ref(storage, 'noteImages/' + parseInt(Math.random() * 23423425312) + file.name);
            const metadata = {
                contentType: file.type,
              };
            await uploadBytes(fileRef, file, metadata)
            const url = await getDownloadURL(fileRef)
            console.log("url",url);
            
            let updatedNote  = {
                uid:note.uid,
                userName:note.userName,
                userProfileURL:note.userProfileURL,
                title: note.title,
                content: note.content,
                subject: note.subject,
                createAt: note.createdAt,
                createdBy: note.createdBy,
                lastEditBy: note.lastEditBy,
                lastEditAt: note.lastEditAt,
                imageURL:url,
                

                
            }

            const collectionRef = collection(db, "notes")
            const response = await addDoc(collectionRef, updatedNote)
            console.log("response after firebase store", response);
            note.setLoading(false)
        } catch (error) {
            console.log("error", error);
        }
        return note
    }
)

const noteSlice = createSlice({
    name: "note",
    initialState: {
        note: [],
        updateNote: null,
    },
    reducers: {
        addNote: (state, action) => {
            console.log("Action in addNote:", action.payload);
        },
        updateDocId: (state, action) => {
            const note = state.note.find((note) => note.id === action.payload);
            state.updateNote = note || null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createNote.fulfilled, (state, action) => {
            state.note = [action.payload, ...state.note];
        });
        builder.addCase(updateNote.fulfilled, (state, action) => {
            state.note = state.note.map((note) => {
                if (note.id === action.payload.id) {
                    return action.payload
                }
                return note
            })
            state.updateNote = null
        })
        builder.addCase(getNotes.fulfilled, (state, action) => {
            state.note = action.payload;
        })
        builder.addCase(deleteNote.fulfilled, (state, action) => {
            state.note = state.note.filter((note) => note.id !== action.payload)
        })
    },
});

export const { addNote, updateDocId } = noteSlice.actions;
export default noteSlice.reducer;