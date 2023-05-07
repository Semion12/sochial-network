import { check } from "express-validator";

export const validator = [
    check('email', 'введите корректный email').isEmail(),
    check('password', 'пароль должен быть от 3 до 40 символов').isLength({min:3, max:40}),
    check('firstName', 'имя должно быть от 2 до 20 символов').isLength({min:2, max:20}),
    check('lastName', 'фамилия должна быть от 2 до 20 символов').isLength({min:2, max:20})
    
]