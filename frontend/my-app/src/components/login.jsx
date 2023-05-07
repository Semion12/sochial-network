import { useTheme } from '@emotion/react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch} from 'react-redux'
import { setLogin } from '../state/authReducer'
import axios from 'axios'
import {useNavigate } from 'react-router'

const loginSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required')
})

const initialLoginValues = {
    email: '',
    password: ''
}

const Login = ({ setPageType }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { palette } = useTheme()

    const login = async (values, onSubmitProps) => {
        await axios.post('http://localhost:3001/auth/login', JSON.stringify(values), {
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }).then(({ data }) => {
            dispatch(setLogin({
                user: data.user,
                token: data.token
            }))
        })
        onSubmitProps.resetForm()
        navigate('/home')
    }
    return (
        <Formik
            onSubmit={login}
            initialValues={initialLoginValues}
            validationSchema={loginSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                resetForm
                /* and other goodies */

            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display={'grid'}
                        gap={'30px'}
                        gridTemplateColumns='repeat(4, minmax(0, 1fr))'>

                        <TextField
                            name='email'
                            label='email'
                            onChange={handleChange}
                            value={values.email}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            sx={{ gridColumn: 'span 4' }}
                        />
                        <TextField
                            type={'password'}
                            name='password'
                            label='password'
                            onChange={handleChange}
                            value={values.password}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            sx={{ gridColumn: 'span 4' }}
                        />
                    </Box>
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: '2rem 0',
                                p: '1rem',
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                '&:hover': {
                                    backgroundColor: palette.primary.main
                                }
                            }}>
                            LOGIN
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType('register')
                                resetForm()
                            }}
                            sx={{
                                textDecoration: 'underline',
                                color: palette.primary.main,
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >

                            Already have an account ? Login here
                        </Typography>
                    </Box>
                </form>
            )
            }
        </Formik >
    )
}

export default Login