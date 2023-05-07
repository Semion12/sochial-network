import { Box } from "@mui/material"

const UserImage = ({ image, size }) => {
    return (
        <Box>
            <img
                style={{ 'borderRadius': '50%' }}
                width={size}
                height={size}
                src={`http://localhost:3001/images/${image}` || 'http://localhost:3001/images/avatar'}
                alt="user" />
        </Box>
    )
}

export default UserImage