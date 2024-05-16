import { Request } from './config'

export const createCmdArticle = (cmdarticle) => new Promise((resolve, reject) => {

    Request.post("/cmdarticle", cmdarticle).then((res) => {
        resolve(res)
        console.log(res)
    }).catch((err) => {
        reject(err.toJSON())
    })
})