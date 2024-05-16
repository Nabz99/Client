import { Request } from '../../src/api/config'

export const getCmdArticlebyclient = (clientId) => new Promise((resolve, reject) => {

    Request.get(`/cmdarticle/findcmdarticlebyclient/${clientId}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getPubbyclient = (clientId) => new Promise((resolve, reject) => {

    Request.get(`/pub/findpubbyclient/${clientId}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})

export const getVersementbyclient = (clientId) => new Promise((resolve, reject) => {

    Request.get(`/versement/findversementbyclient/${clientId}`).then((res) => {
        resolve(res)
    }).catch((err) => {
        console.error(err)
        reject(err)
    })
})