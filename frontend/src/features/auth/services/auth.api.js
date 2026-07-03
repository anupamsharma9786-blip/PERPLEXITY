import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})


export const login = async ({email, password})=>{

    const response = await api.post("/api/auth/login", {
        email: email,
        password: password
    })

    return response.data
}

export const register = async ({email, username, password})=>{

    const response = await api.post("/api/auth/register", {
        username: username,
        email: email,
        password: password
    })

    return response.data
}

export const getMe = async ()=>{

    const response = await api.get("/api/auth/get-me", {
        username: username,
        email: email,
        password: password
    })

    return response.data
}