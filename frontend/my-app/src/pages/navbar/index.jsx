import { useTheme } from "@emotion/react"
import { Box, FormControl, IconButton, Input, InputBase, Menu, MenuItem, Select, Typography, useMediaQuery } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router"
import { FlexBetween } from "./flexBetween"
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';
import { useDispatch, useSelector } from "react-redux"
import { setLogout, setMode } from "../../state/authReducer"
import { DarkMode, LightMode } from "@mui/icons-material"

export const Navbar = () => {
    const [isMobileMenuToggled, setisMobileMenuToggled] = useState(false)
    
    const theme = useTheme()
    const alt = theme.palette.background.alt
    const primaryLight = theme.palette.primary.light
    const neuturalLight = theme.palette.neutral.light
    const dark = theme.palette.neutral.dark
    const isNonMobileScreen = useMediaQuery('(min-width:1000px)')
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user)
    console.log(user)

    const dispatch = useDispatch()
    return (
        <FlexBetween padding='1rem 6%' backgroundColor={alt}>
            <FlexBetween gap={'1.75rem'}>
                <Typography
                    fontWeight={'bold'}
                    fontSize={"2rem"}
                    color='primary'
                    onClick={() => navigate('/home')}
                    sx={{
                        '&:hover': {
                            color: primaryLight,
                            cursor: 'pointer'
                        }
                    }}>
                    Sochipedia
                </Typography>
                {isNonMobileScreen && (
                    <FlexBetween backgroundColor={neuturalLight} borderRadius='9px' padding={'0.1rem 1.5rem'} gap='3rem'>
                        <InputBase placeholder="Seacrh" />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </FlexBetween>
                )}

            </FlexBetween>
            {isNonMobileScreen ?
                <FlexBetween gap={'2rem'}>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {
                            theme.palette.mode === 'light'

                                ? <LightMode sx={{ fontSize: '25px', color: dark }} />
                                : <DarkMode sx={{ fontSize: '25px' }} />
                        }
                    </IconButton>
                    <MessageIcon sx={{ fontSize: '25px' }} />
                    <NotificationsIcon sx={{ fontSize: '25px' }} />
                    <HelpIcon sx={{ fontSize: '25px' }} />
                    <FormControl variant="standard">
                        <Select
                            defaultValue={user.firstName}
                            sx={{
                                width: '150px',
                                backgroundColor: neuturalLight,
                                borderRadius: '0.25rem',
                                p: '0.25rem 1rem',
                                '& .MuiSvgIcon-root': {

                                    width: '3rem'
                                },
                                '& .MuiSelect-select:focus': {
                                    backgroundColor: neuturalLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={user.firstName}>
                                <Typography>{user.firstName}</Typography>

                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
                : <FlexBetween>
                    <IconButton onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}>

                            <MenuIcon />
                    </IconButton>
                </FlexBetween>}
            {!isNonMobileScreen && isMobileMenuToggled && (

                <Box
                    sx={{
                        position: 'fixed',
                        right: 0,
                        bottom: 0,
                        height: '100%',
                        backgroundColor: '#eee',
                        minWidth: '300px',
                        maxWidth: '500px'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: '0.5rem' }} onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <FlexBetween sx = {{display:'flex', flexDirection:'column'}} gap={'2rem'}>
                            <IconButton onClick={() => dispatch(setMode())}>
                                {
                                    theme.palette.mode === 'light'

                                        ? <LightMode sx={{ fontSize: '25px', color: dark }} />
                                        : <DarkMode sx={{ fontSize: '25px' }} />
                                }
                            </IconButton>
                            <MessageIcon sx={{ fontSize: '25px' }} />
                            <NotificationsIcon sx={{ fontSize: '25px' }} />
                            <HelpIcon sx={{ fontSize: '25px' }} />
                            <FormControl variant="standard">
                                <Select
                                    value={'papa'}
                                    sx={{
                                        width: '150px',
                                        backgroundColor: neuturalLight,
                                        borderRadius: '0.25rem',
                                        p: '0.25rem 1rem',
                                        '& .MuiSvgIcon-root': {

                                            width: '3rem'
                                        },
                                        '& .MuiSelect-select:focus': {
                                            backgroundColor: neuturalLight
                                        }
                                    }}
                                    input={<InputBase />}
                                >
                                    <MenuItem value='lalala'>
                                        <Typography>test</Typography>

                                    </MenuItem>
                                    <MenuItem onClick={() => dispatch(setLogout())}>log Out</MenuItem>
                                </Select>
                            </FormControl>
                        </FlexBetween>
                        : <FlexBetween>
                            <IconButton onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}>


                            </IconButton>
                        </FlexBetween>
                    </Box>


                </Box>
            )}
        </FlexBetween>
    )
}