import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { WidgetWrapper } from "../../components/widgetWrapper"
import { FlexBetween } from "../navbar/flexBetween"
import UserImage from "../../components/userImage"
import { Box, Button, Divider, InputBase, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"
import Dropzone from "react-dropzone"
import EditIcon from '@mui/icons-material/Edit';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import axios from "axios"
import { setPosts } from "../../state/authReducer"

const MyPostWidget = ({ pictureUrl }) => {
    const { _id } = useSelector(state => state.auth.user)
    const { token } = useSelector(state => state.auth)
    const theme = useTheme()
    const medium = theme.palette.neutral.medium
    const [post, setPost] = useState('')
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()
    const handlePost = async () => {
        const formData = new FormData()
        formData.append('userId', _id)
        formData.append('description', post)
        if (image) {
            formData.append('avatar', image)
            formData.append('picturePath', image.name)

        }
        await axios.post('http://localhost:3001/posts', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {

            dispatch(setPosts(response.data))
            setImage(null)
            setIsImage(false)
            setPost('')

        })
    }

    return (
        <WidgetWrapper>
            <FlexBetween gap={'1.5rem'}>
                <UserImage image={pictureUrl} size={'60px'} />
                <InputBase
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="what's in your mind..."
                    sx={
                        {
                            width: '100%',
                            borderRadius: '2rem',
                            backgroundColor: theme.palette.neutral.light,
                            padding: '1rem 2rem'
                        }
                    } />
            </FlexBetween>
            {isImage && (
                <Box
                    borderRadius={'5px'}
                    p='1rem'
                    mt='1rem'
                    border={`1px solid ${medium}`}
                >
                    <Dropzone
                        acceptedFiles={'.jpg,.jpeg,.png'}
                        onDrop={acceptedFiles => setImage(acceptedFiles[0])}>
                        {({ getRootProps, getInputProps }) => (
                            <Box
                                border={`1px dashed ${theme.palette.primary.main}`}
                                p='1rem'
                                sx={{ cursor: 'pointer' }}
                                {...getRootProps()}>
                                <input {...getInputProps()} />
                                {!image
                                    ? <p>Add files</p>
                                    : <FlexBetween>
                                        <Typography>{image.name}</Typography>
                                        <EditIcon />
                                    </FlexBetween>}
                            </Box>

                        )}
                    </Dropzone>
                </Box>
            )}
            <Divider sx={{ margin: '1.25rem 0' }} />
            <FlexBetween>
                <FlexBetween gap={'0.25rem'} onClick={() => setIsImage(!isImage)}>
                    <ImageOutlinedIcon color={theme.palette.neutral.mediumMain} />
                    <Typography sx={{
                        "&:hover": {
                            cursor: 'pointer',
                            color: { medium }
                        }
                    }}>image</Typography>
                </FlexBetween>
                <FlexBetween gap={'0.25rem'} >
                    <GifBoxOutlinedIcon />
                    clip
                </FlexBetween>
                <FlexBetween gap='0.25rem'>
                    <AttachFileIcon />
                    <Typography>attachment</Typography>
                </FlexBetween>
                <FlexBetween gap='0.25rem'>
                    <KeyboardVoiceIcon />
                    <Typography>audio</Typography>
                </FlexBetween>
                <Button
                    onClick={handlePost}
                    sx={{
                        color: theme.palette.background.alt,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '3rem'
                    }}
                >POST</Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default MyPostWidget