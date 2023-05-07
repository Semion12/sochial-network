import { Box, Divider, FormControl, IconButton, InputAdornment, InputBase, Typography } from "@mui/material"
import { WidgetWrapper } from "../../components/widgetWrapper"
import { FlexBetween } from "../navbar/flexBetween"
import { Friends } from "../../components/Friends"
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { setComments } from "../../state/authReducer";


export const PostWidget = ({ _id, userId, firstName, lastName, location, description, picturePath, userPicturePath, likes, comments }) => {

    const theme = useTheme()
    const main = theme.palette.neutral.main
    const { token } = useSelector((state) => state.auth)
    const {email} = useSelector((state)=>state.auth.user)
    
    const dispatch = useDispatch()
    const [openComments, setOpenComments] = useState(false)
    const [comment, setComment] = useState('')
    
    const sendComment = async () => {
        await axios.post(`http://localhost:3001/posts/comments/${_id}`, {
            email:email,
            comment: comment
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({ data }) => {
            
            dispatch(setComments(data))
            setComment('')

        })
    }





    return (
        <WidgetWrapper m={'2rem 0'}>
            <FlexBetween>
                <Friends userPicturePath ={userPicturePath} name={firstName + ' ' + lastName} friendId={userId} subtitle={location} />

            </FlexBetween>
            
            <Typography fontSize={18} mt={'1rem'} color={main}>{description}</Typography>
            {picturePath && <img width={'100%'} height={'auto'} src={`http://localhost:3001/images/${picturePath}`} alt="png"></img>}
            <FlexBetween mt={'0.5rem'}>
                <FlexBetween gap={'1rem'}>
                    <FlexBetween gap={'0.5rem'} >

                        <FavoriteBorderOutlinedIcon />

                        <Typography>0</Typography>
                    </FlexBetween>
                    <FlexBetween gap={'0.5rem'}>
                        <ChatBubbleIcon sx={{ cursor: 'pointer' }} onClick={() => setOpenComments(!openComments)} />
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <FlexBetween>
                    <ShareIcon />
                </FlexBetween>
            </FlexBetween>
            {openComments && (

                <Box>
                    <Divider sx={{ margin: '1.25rem 0' }} />
                    {comments.length && comments.map((comm, i) => {
                        return (
                            <>
                                <Friends userPicturePath = {comm.user.pictureUrl}  key={i} name={comm.user.firstName + " "+ comm.user.lastName} subtitle={comm.comment} />
                                <Divider sx = {{m:'0.25rem 0'}} />
                            </>
                        )
                    })}

                    <InputBase value={comment} onChange={(e) => setComment(e.target.value)} fullWidth endAdornment={
                        <InputAdornment position="end">
                            <SendIcon sx={{ cursor: 'pointer' }} onClick={sendComment} />
                        </InputAdornment>
                    } placeholder="type something" />

                </Box>
            )}

        </WidgetWrapper>
    )
}