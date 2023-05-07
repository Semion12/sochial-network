import { useDispatch, useSelector } from "react-redux"
import { WidgetWrapper } from "./widgetWrapper"
import { FlexBetween } from "../pages/navbar/flexBetween"
import UserImage from "./userImage"
import { Box, Typography } from "@mui/material"
import { useEffect } from "react"
import axios from "axios"
import { setFriend } from "../state/authReducer"
import { Friends } from "./Friends"

export const FriendsList = ({ userId }) => {
    const { _id } = useSelector((state) => state.auth.user)
    const { token } = useSelector((state) => state.auth)
    const friends = useSelector((state) => state.auth.user.friends)

    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(`http://localhost:3001/users/${_id}/friends`, {
            headers: {
                Authorization: `Bearer ${token}`

            }
        }).then(({ data }) => {
            dispatch(setFriend(data))


        })
    }, [])
    if (!friends.length) {
        return null
    }

    return (

        <WidgetWrapper mt='1rem'>

            {friends && friends.length && friends.map((friend) => {

                return (
                    <Box m= '0.5rem'>
                        <Friends
                            userPicturePath={friend.pictureUrl}
                            key={friend._id}
                            friendId={friend._id}
                            name={friend.firstName + ' ' + friend.lastName}
                            subtitle={friend.occupation}
                        />
                    </Box>





                )
            })}











        </WidgetWrapper>
    )
}