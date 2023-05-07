import { useTheme } from "@emotion/react"
import { Box, Typography, useMediaQuery } from "@mui/material"
import Form from "../../components/Form"



const LoginPage = () => {
    const theme = useTheme()
    const isNonMobileScreen = useMediaQuery('(min-width:1000px')
    return (
        <Box>
            <Box sx={{ backgroundColor: theme.palette.background.alt, width: '100%', p: '1rem 6%', textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '32px' }} color='primary'>
                    Sochipedia
                </Typography>
            </Box>
            <Box sx={{
                width: isNonMobileScreen ? '73%' : '50%',
                p: '2rem',
                m: '2rem auto',
                borderRadius:'1.5rem',
                backgroundColor: theme.palette.background.alt,

            }}>
            <Form />
            </Box>
        </Box>

    )
}

export default LoginPage