import { Link, useNavigate } from 'react-router-dom'
import Input from './Input'
import { useState } from 'react'
import { useItemStore } from '../store/useItemStore'
import { api } from '../api/api'

const CreateItem = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const getItems = useItemStore((state) => state.getItems)
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const item = {
            title: e.target.title.value,
            description: e.target.description.value,
            price: e.target.price.value,
            imageUrl: e.target.imageUrl.value
        }
        try {
            await api.sendItems(item)
            await getItems()
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }
        return (
            <div className="container">
                <div class="page-header">
                    <h1>Создать новый товар</h1>
                </div>

                <div class="form-container">
                    <form id="create-item-form" onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label class="form-label">
                                Название товара <span class="required">*</span>
                            </label>
                            <Input
                                type="text"
                                class="form-input"
                                name="title"
                                placeholder="Например: iPhone 14 Pro 256GB"
                                maxlength="100"
                                required
                            />
                            <div class="char-counter">
                                <span class="current">0</span> / 100
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">
                                Описание <span class="required">*</span>
                            </label>
                            <textarea
                                class="form-textarea"
                                name="description"
                                placeholder="Подробно опишите товар, его состояние, характеристики..."
                                maxlength="1000"
                                required></textarea>
                            <div class="char-counter">
                                <span class="current">0</span> / 1000
                            </div>
                            <div class="form-hint">
                                Чем подробнее описание, тем больше шансов продать
                                товар
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">
                                Начальная цена <span class="required">*</span>
                            </label>
                            <div class="input-group">
                                <Input
                                    type="number"
                                    class="form-input with-prefix"
                                    name="price"
                                    placeholder="5000"
                                    min="1"
                                    step="100"
                                    required
                                />
                                <span class="input-prefix">₽</span>
                            </div>
                            <div class="form-hint">
                                Укажите минимальную цену, с которой начнутся торги
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">URL изображения</label>
                            <Input
                                type="url"
                                class="form-input"
                                name="imageUrl"
                                placeholder="https://example.com/image.jpg"
                            />
                            <div class="form-hint">
                                Вставьте ссылку на изображение товара (опционально)
                            </div>
                            <div class="image-preview" id="image-preview">
                                <img src="" alt="Предпросмотр" />
                            </div>
                        </div>

                        <div class="form-actions">
                            <Link to="/" class="btn-cancel">
                                Отмена
                            </Link>
                            <button type="submit" class="btn-submit">
                                Создать товар
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    export default CreateItem
