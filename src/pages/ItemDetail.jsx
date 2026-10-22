import { Link, useNavigate, useParams } from "react-router-dom"
import Input from "../components/Input"
import Button from "../components/Button"
import { useItemStore } from "../store/useItemStore"
import { useEffect, useState } from "react"
import { useUserStore } from "../store/useUserStore"
import { api } from "../api/api"

const ItemDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { session } = useUserStore()
    const items = useItemStore((state) => state.items)
    const getItems = useItemStore((state) => state.getItems)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [bids, setBids] = useState([])
    const [timerId, setTimerId] = useState(undefined)

    const loadBids = async () => {
        setIsLoading(true)
        try {
            setBids(await api.getItemBids(id))
        } catch (error) {
            setError(error.message || "Что-то пошло не так")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const load = async () => {
            setIsLoading(true)
            try {
                await getItems()
                await loadBids()
            } catch (error) {
                setError(error.message || "Что-то пошло не так")
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        load()
        loadBids()

        setTimerId(setInterval(() => {
            try {
                getItems()
            } catch (error) { }
        }, 10000))
        return () => {
            clearInterval(timerId)
        }
    }, [id])

    const handleBid = async (e) => {
        e.preventDefault()
        setError("")

        const form = e.target
        const amount = Number(form.bidInput.value)

        try {
            await api.createBid({id, amount})
            form.reset()
            await getItems()
            await loadBids()
        } catch (error) {
            setError(error.message|| "Что-то пошло не так")
            console.error(error)
        }
    }

    const handleDelete = async () => {
        setError("")
        try {
            await api.deleteItems(id)
            await getItems()
            navigate("/")
        } catch (error) {
            setError(error.message|| "Что-то пошло не так")
            console.error(error)
        }
    }

    const item = items.find((i) => String(i.id) === id)

    if (!item) return <div className="container">Загрузка...</div>

    const isOwner = session?.user?.id === item.userId

    return (
        <div className="container">
            <Link to={"/"}>← Вернуться к списку товаров</Link>

            <div className="item-detail">
                <div className="item-header">
                    <div>
                        {item.imageUrl && (
                            <img src={item.imageUrl} className="item-image-large" />
                        )}
                    </div>

                    <div className="item-info">
                        <span className="item-status">{item.status}</span>
                        <h1 className="item-title-large">{item.title}</h1>

                        <div className="item-seller-info">
                            <div className="seller-avatar">
                                {item.username?.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="seller-details">
                                <div className="seller-name">{item.username}</div>
                                <div className="seller-date">
                                    {new Date(item.createdAt).toLocaleString("ru-RU")}
                                </div>
                            </div>
                        </div>

                        <div className="item-description-full">{item.description}</div>

                        <div className="price-section">
                            <div className="starting-price">Начальная цена:</div>
                            <div className="current-price">{item.price}</div>
                            <div className="highest-bid">
                                Текущая ставка:{" "}
                                {item.highestBid == null ? "Ставок нет" : item.highestBid}
                            </div>

                            <form className="bid-form" onSubmit={handleBid}>
                                <Input
                                    type="number"
                                    name="bidInput"
                                    className="bid-input"
                                    placeholder="Введите вашу ставку"
                                    min={item.highestBid ?? item.price}
                                    step="100"
                                />
                                <Button type="submit" className="btn-bid">
                                    Сделать ставку
                                </Button>
                            </form>

                            {!isLoading && error && (
                                <div className="alert alert-error active">{error}</div>
                            )}

                            {isOwner && (
                                <Button type="button" onClick={handleDelete}>
                                    Удалить товар
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bids-section">
                    <div className="bids-header">
                        <h2 className="bids-title">История ставок</h2>
                        <span className="bids-count">{bids.length}</span>
                    </div>

                    <div className="bids-list">
                        {bids.map((bid, index) => (
                            <div
                                key={bid.id}
                                className={
                                    index === 0 ? "bid-item highest-bid-item" : "bid-item"
                                }
                            >
                                <div className="bid-user">
                                    <div className="bid-avatar">
                                        {bid.username?.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className="bid-details">
                                        <span className="bid-username">{bid.username}</span>
                                        <span className="bid-time">
                                            {new Date(bid.createdAt).toLocaleString("ru-RU")}
                                        </span>
                                    </div>
                                    {index === 0 && (
                                        <span className="highest-badge">🏆 Лидирует</span>
                                    )}
                                </div>
                                <div className="bid-amount">{bid.amount} ₽</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail