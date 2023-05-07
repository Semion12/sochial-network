import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state/authReducer"
import { PostWidget } from "./PostWidget"

export const PostsWidget = ({ profileId }) => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.auth.posts)
    const { token } = useSelector((state) => state.auth)
    useEffect(() => {
        axios.get('http://localhost:3001/posts/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {

            dispatch(setPosts(response.data))
        })

    }, [dispatch, token])
    
    return (
        <div>
            {posts.map(({ _id, userId, firstName, lastName, location, description, picturePath, userPicturePath, likes, comments }) => {
                return (
                    <PostWidget
                        _id={_id}
                        profileId={profileId}
                        key={_id}
                        userId={userId}
                        firstName={firstName}
                        lastName={lastName}
                        location={location}
                        description={description}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                        picturePath={picturePath} />
                )
            })}
        </div>
    )
}