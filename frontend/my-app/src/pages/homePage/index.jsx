import { useTheme } from "@emotion/react"
import { createTheme } from "@material-ui/core"
import { Box, Grid, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import { Navbar } from "../navbar"
import { UserWidget } from "../widgets/UserWidget"
import MyPostWidget from "../widgets/MyPostWidget"
import {PostsWidget} from '../widgets/PostsWidget'
import { FriendsList } from "../../components/FriendsList"
import { Sponsorred } from "../../components/Sponsorred"

const HomePage = () => {
    const { _id, pictureUrl } = useSelector((state) => state.auth.user)
    
   
    const isNonMobileSreen = useMediaQuery('(min-width:1000px)')

    return (

        <div>
            <Navbar />
            <Box padding={'2rem 6%'}
                width='100%'
                display={isNonMobileSreen ? 'flex' : 'block'}
                gap='0.5rem'
                justifyContent={'space-between'}>

                <Box flexBasis={isNonMobileSreen ? '26%' : undefined}>
                    <UserWidget userId={_id} pictureUrl={pictureUrl} />

                </Box>
                <Box flexBasis={'42%'}>
                    <MyPostWidget pictureUrl={pictureUrl} />
                    <PostsWidget userId = {_id} />
                    
                </Box>
                <Box flexBasis={'32%'}>
                    <Sponsorred />
                    <FriendsList userId = {_id} />
                </Box>
            </Box>

        </div >
    )
}

export default HomePage