import { Request } from './config'

export const signup = (client_) => new Promise((resolve, reject) => {

    Request.post("/auth/client/signup", client_).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})


export const login = (email, password) => new Promise((resolve, reject) => {

    Request.post('/auth/client/sign-in', { email, password }).then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})