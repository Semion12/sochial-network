import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  mode: 'light',

  user: null,
  token: null,
  posts: []
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null
    },
    setLogin: (state, action) => {

      state.token = action.payload.token
      state.user = action.payload.user;


    },
    setPosts: (state, action) => {

      state.posts = action.payload
    },
    setPost: (state, action) => {
      const updatePost = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post
        return post
      })
      state.posts = updatePost
    },
    setFriend: (state, action) => {
      console.log(state.user.friends)
      if (state.user) {

        state.user.friends = action.payload

      }
    },
    setComments: (state, action) => {
      console.log(state.posts.comments, action.payload)
      if (state.posts) {
        state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post.comments = action.payload.comments
          }

          return post.comments
        })


      }
    }
  },

})

export const { setMode, setLogout, setLogin, setPosts, setPost, setFriend, setComments } = authSlice.actions
export default authSlice.reducer