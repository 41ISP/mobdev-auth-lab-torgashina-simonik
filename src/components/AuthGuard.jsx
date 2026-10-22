import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"

export const AuthGuard = ({ children }) => {
    const { session } = useUserStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!session?.token) navigate('/login')
    }, [])
    if (!session?.token) return <></>
    return children
}