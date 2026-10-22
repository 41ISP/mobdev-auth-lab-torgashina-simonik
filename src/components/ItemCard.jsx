import { Link } from "react-router-dom"

const ItemCard = ({
    id,
    status,
    title,
    description,
    price,
    bidCount,
    username,
    highestBid,
    imageUrl,
}) => {
    return (
        <Link to={`/item/${id}`} className="item-card-link">
            <div className="item-card">
                <img src={imageUrl} class="item-image" />
                <div class="item-content">
                    <span class="status-badge status-active">{status}</span>
                    <h3 class="item-title">{title}</h3>
                    <p class="item-description">{description}</p>
                    <div class="item-footer">
                        <div>
                            <div class="item-price">{price}</div>
                            <div class="bid-info">
                                {highestBid}
                                <span class="bid-count">{bidCount}</span>
                            </div>
                        </div>
                        <div class="item-meta">
                            <span class="item-seller">Продавец: {username}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ItemCard
