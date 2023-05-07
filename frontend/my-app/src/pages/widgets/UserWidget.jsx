import { useTheme } from "@emotion/react"
import { Box, Divider, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UserImage from "../../components/userImage"
import { WidgetWrapper } from "../../components/widgetWrapper"
import { FlexBetween } from '../navbar/flexBetween'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';


export const UserWidget = ({ userId, pictureUrl }) => {
    const [user, setUser] = useState(false)
    const token = useSelector((state) => state.auth.token)
    const theme = useTheme()
    const dark = theme.palette.neutral.dark
    const medium = theme.palette.neutral.medium
    const main = theme.palette.neutral.main
    const friends = useSelector((state) => state.auth.user.friends)

    const getUser = async () => {
        await axios.get(`http://localhost:3001/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token} `
            }
        }).then(({ data }) => {
            setUser(data)
        })


    }
    useEffect(() => {
        getUser()
    }, [])
    if (!user) {
        return null
    }
    return (
        <WidgetWrapper theme={theme}>
            <FlexBetween gap={'0.75rem'} pb={'1.1rem'}>
                <FlexBetween gap={'1rem'}>
                    <UserImage image={pictureUrl} size={'60px'} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight={500}
                            sx={{
                                "&:hover": {
                                    cursor: 'pointer',
                                    color: theme.palette.primary.light
                                }
                            }}
                        >
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>

            </FlexBetween>
            <Divider light />

            <Box p='1rem 0'>
                <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                    <LocationOnOutlinedIcon fontSize="large" />
                    <Typography color={medium}>{user.location}</Typography>
                </Box>
                <Box display='flex' alignItems='center' gap='1rem'>
                    <WorkOutlineOutlinedIcon fontSize="large" />
                    <Typography color={medium}>{user.occupation}</Typography>
                </Box>
            </Box>

            <Divider light />

            <Box p='1rem 0'>
                <FlexBetween mb='0.5rem' >
                    <Typography color={medium}>Who viewed your profile</Typography>
                    <Typography color={main}>{user.viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Impessions of your posts</Typography>
                    <Typography color={main}>{user.impressions}</Typography>
                </FlexBetween>


            </Box>

            <Divider light />

            <Box p='1rem 0'>
                <Typography mb='1rem' fontWeight={500} color={main} fontSize='1rem'>
                    Social profiles
                </Typography>
                <FlexBetween mb='0.5rem'>
                    <FlexBetween gap={'1rem'}>
                        <TwitterIcon color="disabled" fontSize="large" />
                        <Box>
                            <Typography color={main} fontWeight={500}>Twitter</Typography>
                            <Typography color={medium}>Social network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditIcon color="action" />
                </FlexBetween>
                <FlexBetween>
                    <FlexBetween gap={'1rem'}>
                        <FacebookIcon color="disabled" fontSize="large" />
                        <Box>
                            <Typography color={main} fontWeight={500}>Facebook</Typography>
                            <Typography color={medium}>Social network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditIcon color="action" />
                </FlexBetween>

            </Box>
        </WidgetWrapper>
    )
}