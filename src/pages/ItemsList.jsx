import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import { api } from '../api/api'
import { useItemStore } from '../store/useItemStore'

const ItemsList = () => {
    const items = useItemStore((state) => state.items)
    const getItems = useItemStore((state) => state.getItems)
    const [stats, setStats] = useState(null)

    useEffect(() => {
        getItems()

        const loadStats = async () => {
            try {
                const data = await api.getStats()
                setStats(data)
            } catch (error) {
                console.error(error)
            }
        }
        loadStats()
    }, [])
    return (
        <div className="container">
            <div class="page-header">
                <h1>Все товары</h1>
            </div>
            <div class="stats">
                <div class="stat-item">
                    <span class="stat-value">{stats?.totalItems ?? 0}</span>
                    <span class="stat-label">Товаров</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.totalBids ?? 0}</span>
                    <span class="stat-label">Ставок</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.activeItems ?? 0}</span>
                    <span class="stat-label">Активных</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.averageItemPrice ?? 0}</span>
                    <span class="stat-label">Средняя цена</span>
                </div>
            </div>

            <div class="items-grid">
                {items.map((item, i) => (
                    <ItemCard key={i} {...item} />
                ))}
            </div>
        </div>
    )
}

export default ItemsList
