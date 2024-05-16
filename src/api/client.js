import { Request } from './config'

export const updateClient = (client, id) => new Promise((resolve, reject) => {

    Request.put(`/client/${id}`, client).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})