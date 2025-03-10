import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    selectedComment: null, // Lưu trữ bình luận đang được chọn để chỉnh sửa
  },
  reducers: {
    setSelectedComment: (state, action) => {
      state.selectedComment = action.payload;
    },
    clearSelectedComment: (state) => {
      state.selectedComment = null;
    },
  },
});

export const { setSelectedComment, clearSelectedComment } = commentSlice.actions;
export default commentSlice.reducer;