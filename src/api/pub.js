import { Request } from './config'

export const createPub = (pub) => new Promise((resolve, reject) => {

    Request.post("/pub/cre", pub).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})
