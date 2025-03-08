import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    addReplyToComment: (state, action) => {
      const { parentId, reply } = action.payload;
      const parentComment = state.comments.find((comment) => comment._id === parentId);
      if (parentComment) {
        if (!parentComment.replies) parentComment.replies = [];
        parentComment.replies.unshift(reply);
      }
    },
    updateComment: (state, action) => {
      const index = state.comments.findIndex((comment) => comment._id === action.payload._id);
      if (index !== -1) state.comments[index] = action.payload;
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter((comment) => comment._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setComments,
  addComment,
  addReplyToComment,
  updateComment,
  deleteComment,
  setLoading,
  setError,
} = commentSlice.actions;

export default commentSlice.reducer;