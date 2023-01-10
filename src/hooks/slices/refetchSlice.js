import { createSlice } from '@reduxjs/toolkit'

export const refetchSlice = createSlice({
  name: 'counter',
  initialState: {
    post_list_refetch: 0,
    post_detail_refetch: 0,
    comment_list_refetch: 0,
    comment_detail_refetch: 0,
  },
  reducers: {
    refetch_post_list_toggle: (state) => {
      state.post_list_refetch += 1
    },
    refetch_post_detail_toggle: (state) => {
        state.post_detail_refetch += 1
    },
    refetch_comment_list_toggle: (state) => {
      state.comment_list_refetch += 1
    },
    refetch_comment_detail_toggle: (state) => {
      state.comment_detail_refetch += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  refetch_post_list_toggle,
  refetch_post_detail_toggle,
  refetch_comment_list_toggle,
  refetch_comment_detail_toggle,
} = refetchSlice.actions

export default refetchSlice.reducer