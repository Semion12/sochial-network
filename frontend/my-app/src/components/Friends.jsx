import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setFriend } from "../state/authReducer"
import { FlexBetween } from "../pages/navbar/flexBetween"
import UserImage from "./userImage"
import { Box, IconButton, Typography } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export const Friends = ({ userPicturePath, friendId, name, subtitle }) => {
    const { _id } = useSelector(state => state.auth.user)
    const friends = useSelector(state => state.auth.user.friends)
    const { token } = useSelector(state => state.auth)
    const dispach = useDispatch()
    const isProfile = _id === friendId
    const isFriend = friends.find((friend) => friend._id === friendId)
    const patchFriends = () => {
        axios.patch(`http://localhost:3001/users/${_id}/${friendId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({ data }) => {

            dispach(setFriend(data))
        })
    }
    return (
        <FlexBetween width={'100%'} >
            <FlexBetween gap={'1rem'} >
                <UserImage image={userPicturePath} size={'60px'} />
                <Box>
                    <Box>
                        <Typography>{name}</Typography>
                        <Typography>{subtitle}</Typography>
                    </Box>
                </Box>
            </FlexBetween>
            {!isProfile && friendId &&
                <IconButton onClick={patchFriends}>
                    {!isFriend
                        ? <PersonAddAlt1Icon />
                        : <PersonRemoveIcon />}
                </IconButton>}
        </FlexBetween>
    )

}