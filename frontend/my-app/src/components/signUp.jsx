import { useTheme } from '@emotion/react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import Dropzone from 'react-dropzone'
import * as yup from 'yup'
import { FlexBetween } from '../pages/navbar/flexBetween'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'

const regiserSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
    location: yup.string().required('required'),
    occupation: yup.string().required('required'),
    picture: yup.string().required('required')
})

const initialRegisterValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
    picture: ''
}

const SignUp = ({ setPageType }) => {
    const { palette } = useTheme()

    const register = async (values, onSubmitProps) => {
        const formData = new FormData()
        for (let value in values) {
            if (value !== 'picture') {
                formData.append(value, values[value])
            }
        }
        formData.append('pictureUrl', values.picture.name)
        await axios.post('http://localhost:3001/auth/register', formData, {
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response) {
                onSubmitProps.resetForm()
                setPageType('login')
            }
        })
    }
    return (
        <Formik
            onSubmit={register}
            initialValues={initialRegisterValues}
            validationSchema={regiserSchema}
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
                            name='firstName'
                            label='First Name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                            sx={{ gridColumn: 'span 2' }}
                        />
                        <TextField
                            name='lastName'
                            label='Last Name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            sx={{ gridColumn: 'span 2' }}
                        />
                        <TextField
                            name='location'
                            label='location'
                            onChange={handleChange}
                            value={values.location}
                            error={Boolean(touched.location) && Boolean(errors.location)}
                            sx={{ gridColumn: 'span 4' }}
                        />
                        <TextField
                            name='occupation'
                            label='occupation'
                            onChange={handleChange}
                            value={values.occupation}
                            error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                            sx={{ gridColumn: 'span 4' }}
                        />
                        <Box
                            p='1rem'
                            sx={{ border: '1px solid black', gridColumn: 'span 4' }}>
                            <Dropzone
                                acceptedFiles={'.jpg,.jpeg,.png'}
                                onDrop={acceptedFiles => setFieldValue('picture', acceptedFiles[0])}>
                                {({ getRootProps, getInputProps }) => (

                                    <Box
                                        border={'1px dashed black'}
                                        p='1rem'
                                        sx={{ cursor: 'pointer' }}
                                        {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {!values.picture
                                            ? <p>Add files</p>
                                            : <FlexBetween>
                                                <Typography>{values.picture.name}</Typography>
                                                <EditIcon />
                                            </FlexBetween>}
                                    </Box>

                                )}
                            </Dropzone>
                        </Box>
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
                            REGISTER
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType('login')
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

export default SignUp