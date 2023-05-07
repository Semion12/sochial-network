import { useState } from "react"
import Login from "./login"
import SignUp from "./signUp"

const Form = () => {
    const [pageType, setPageType] = useState('register')
    return (
        <>
            {pageType == 'login' ? <Login setPageType = {setPageType}/> : <SignUp setPageType = {setPageType} />}
            
        </>
    )
}

export default Form