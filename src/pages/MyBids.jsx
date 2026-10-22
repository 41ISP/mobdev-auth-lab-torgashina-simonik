import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../api/api"

const MyBids = () => {
    const [bids, setBids] = useState([])

    useEffect(() => {
        const loadBids = async () => {
            try {
                setBids(await api.getMyBids())
            } catch (error) {
                console.error(error)
            }
        }
        loadBids()
    }, [])

    const winningCount = bids.filter((bid) => bid.isWinning).length
    const totalAmount = bids.reduce((sum, bid) => sum + bid.amount, 0)

    return (
        <div className="container">
            <div className="page-header">
                <h1>Мои ставки</h1>
                <p className="page-subtitle">История ваших ставок на товары</p>
            </div>

            <div className="bids-summary">
                <div className="summary-card">
                    <span className="summary-value">{bids.length}</span>
                    <span className="summary-label">Всего ставок</span>
                </div>
                <div className="summary-card winning">
                    <span className="summary-value">{winningCount}</span>
                    <span className="summary-label">Лидирующих ставок</span>
                </div>
                <div className="summary-card">
                    <span className="summary-value">{totalAmount} ₽</span>
                    <span className="summary-label">Общая сумма</span>
                </div>
            </div>

            <div className="bids-list">
                {bids.map((bid) => (
                    <div key={bid.id} className={bid.isWinning ? "bid-item winning" : "bid-item"}>
                        <div className="bid-item-content">
                            <div className="bid-item-header">
                                <Link to={`/item/${bid.itemId}`} className="bid-item-title">
                                    {bid.itemTitle}
                                </Link>
                                {bid.isWinning ? (
                                    <span className="winning-badge">🏆 Лидирую</span>
                                ) : (
                                    <span className="outbid-badge">Перебита</span>
                                )}
                            </div>
                            <div className="bid-item-meta">
                                <span>⏰ {new Date(bid.createdAt).toLocaleString("ru-RU")}</span>
                            </div>
                        </div>
                        <div className="bid-item-amount">
                            <span className="bid-amount">{bid.amount} ₽</span>
                            <span className="bid-status">Моя ставка</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBids
