import { Box, Typography } from "@mui/material"
import { WidgetWrapper } from "./widgetWrapper"
import { useTheme } from "@emotion/react"
import { FlexBetween } from "../pages/navbar/flexBetween"

export const Sponsorred = (size = '10px')=>{
    const theme = useTheme()
    const dark = theme.palette.neutral.dark
    return (
        <WidgetWrapper>
            
            <Box >
                <Typography variant="h4" color={dark} mb={'0.5rem'}>Sponsorred</Typography>
                <img style={{width:'100%', height:'100%', borderRadius:'0.25rem'}} src="https://klike.net/uploads/posts/2022-09/1663154629_g-19.jpg" alt="" />
                <FlexBetween>
                    <Typography>test</Typography>
                    <Typography>test</Typography>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    )
}