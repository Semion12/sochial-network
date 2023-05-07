import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next) => {
    try {
        let token = req.header('Authorization')
        console.log(token)

        if (!token) {
            
            return res.status(403).send("Acces denied")
        }

        if (token.startsWith('Bearer ')) {

            token = token.slice(7, token.length).trimLeft()

        }
        const verified = jwt.verify(token, process.env.SECRET_KEY)

        req.user = verified
        next()
    }catch(e){
        res.send(e)
    }
    
}