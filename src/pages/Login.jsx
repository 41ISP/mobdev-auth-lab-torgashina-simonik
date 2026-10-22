import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { useState } from "react"
import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"

const Login = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { setSession } = useUserStore()

    const handleSubmit = async(e) => {
            e.preventDefault()
            setError("")
    
            const user = {
                username: e.target.username.value,
                password: e.target.password.value,
            }
    
            try {
                const data = await api.loginUser(user)
                setSession(data.data)
                navigate("/")
            } catch (error) {
                setError(error.response.data.error)
                console.error(error)
            }
        }


    return (
        <div className="container">
            <div class="auth-container">
                {error && <div className="alert alert-error active">{error}</div>}
                <div class="auth-header">
                    <div class="auth-icon">🔐</div>
                    <h1 class="auth-title">Вход</h1>
                    <p class="auth-subtitle">Войдите в свой аккаунт</p>
                </div>

                <div class="alert alert-error" id="error-alert">
                    Неверное имя пользователя или пароль
                </div>

                <form id="login-form" onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label class="form-label">Имя пользователя</label>
                        <Input
                            type="text"
                            class="form-input"
                            name="username"
                            placeholder="Введите имя пользователя"
                            required
                            autocomplete="username"
                        />
                        <div class="form-error">Введите имя пользователя</div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Пароль</label>
                        <Input
                            type="password"
                            class="form-input"
                            name="password"
                            placeholder="Введите пароль"
                            required
                            autocomplete="current-password"
                        />
                        <div class="form-error">Введите пароль</div>
                    </div>

                    <Button type="submit" class="btn-submit">
                        Войти
                    </Button>
                </form>

                <div class="auth-divider">или</div>

                <div class="auth-link">
                    Нет аккаунта?
                    <Link to={"/register"}>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
