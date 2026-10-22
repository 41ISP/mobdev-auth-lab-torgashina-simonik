import axios from "axios"
import { useUserStore } from "../store/useUserStore";

const apiInstance = axios.create ({
    baseURL: "https://api.kitek-pg.ru/api/marketplace/",
    headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
})

apiInstance.interceptors.request.use((config) => {
    const {session} = useUserStore.getState()

    if(session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }

    return config
})

export const getErrorMessage = (err) =>
    err?.response?.data?.error || err?.message || "Что-то пошло не так"

const registerUser = async(user) => {
    const res = await apiInstance.post("/auth/register", user)
    return res
}

const loginUser = async(user) => {
    const res = await apiInstance.post("/auth/login", user)
    return res
}

const getItems = async() => {
    const res = await apiInstance.get("/items")
    return res.data
}

const getStats = async() => {
    const res = await apiInstance.get("/stats")
    return res.data
}

const getItemBids = async(id) => {
    const res = await apiInstance.get(`/items/${id}/bids`)
    return res.data
}

const getMyBids = async() => {
    const res = await apiInstance.get("/bids/my")
    return res.data
}

const sendItems = async(item) => {
    const res = await apiInstance.post("/items", item)
    return res.data
}

const deleteItems = async(id) => {
    const res = await apiInstance.delete(`/items/${id}`)
    return res.data
}
const createBid = async({id, amount}) => {
    const res = await apiInstance.post(`/items/${id}/bids`, { amount })
    return res.data
}


export const api = {
    registerUser,
    loginUser,
    getItems,
    getStats,
    getItemBids,
    getMyBids,
    sendItems,
    deleteItems,
    createBid
}