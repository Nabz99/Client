import { Request } from './config'

// api calls

export const getArticles = () => new Promise((resolve, reject) => {

    Request.get("/article").then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})