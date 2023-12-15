
import axios from "axios"

export const get = (url: string) => axios(url).then(r => r.data)

export const post = async <T>(url: string, { arg }: { arg: T }) => axios.post(url, arg).then(res => res.data)

export const storage = (key: string) => {
    const res = localStorage.getItem(key)
    return res && JSON.parse(res)
}