import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, onSnapshot, query, where, orderBy, limit, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


//delete comment
export const deleteComment = createAsyncThunk("comment/deletecomment",
    async (id) => {
        try {
            const docRef = doc(db, "comments", id)
            await deleteDoc(docRef)
            return id
        } catch (error) {
            console.log("error", error);

        }
    }
)
// get comments
export const getComments = createAsyncThunk("comment/getcomments", async () => {
    try {
        const collectionRef = collection(db, "comments");
        const queryRef = query(collectionRef);
        const docs = await getDocs(queryRef);
        let data = [];
        docs.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        
    }
});


// create comment
export const createComment = createAsyncThunk(
    "comment/createcomment",
    async (comment) => {

        try {
            let updatedcomment  = {
                uid:comment.uid,
                userName:comment.userName,
                userProfileURL:comment.userProfileURL,
                content: comment.content,
                createAt: comment.createdAt,
                // noteUId:comment.noteUid
                
            }
            console.log('comment in acction',updatedcomment);
            

            const collectionRef = collection(db, "comments")
            const response = await addDoc(collectionRef, updatedcomment)
            console.log("response after firebase store", response);
          
        } catch (error) {
            console.log("error", error);
        }
        return comment
    }
)
const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comment: [],
        updateComment: null,
    },
    reducers: {
        addComment: (state, action) => {
            console.log("Action in addcomment:", action.payload);
        },
        updateDocId: (state, action) => {
            const comment = state.comment.find((comment) => comment.id === action.payload);
            state.updatecomment = comment || null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.comment = [action.payload, ...state.comment];
        });
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.comment = action.payload;
        })
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.comment = state.comment.filter((comment) => comment.id !== action.payload)
        })
    },
});

export const { addComment, updateDocId } = commentSlice.actions;
export default commentSlice.reducer;