import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

const Logout = () => {
    const navigate = useNavigate()
    const {clearSession} = useUserStore()
    useEffect(() => {
        clearSession()
        navigate('/')
    }, [])
    return <></>
}

export default Logout
