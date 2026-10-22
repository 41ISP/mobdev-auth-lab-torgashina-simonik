import { create } from "zustand";
import { api } from "../api/api";

export const useItemStore = create((set) => ({
    items: [],
    getItems: async() => {
        try {
            const items = await api.getItems()
            set({ items })
        } catch(error) {
            console.error(error)
        }
    }
}))