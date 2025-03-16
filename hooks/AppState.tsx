import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { FeedItem } from './RssParser';

// Define your state type
type AppState = {
    favorites: FeedItem[]
    addFavorite: (item: FeedItem) => void
    removeFavorite: (item: FeedItem) => void
}

// Create store with persistence
const useStore = create(persist<AppState>(
    (set) => ({
        favorites: [],
        addFavorite: (item: FeedItem) => set((state) => {
            const newFavorites = [...state.favorites ]
            if (!newFavorites.find((i) => i.guid === item.guid)) {
                newFavorites.push(item)
            }
            return {
                favorites: newFavorites
            }
        }),
        removeFavorite: (item: FeedItem) => set((state) => {
            const newFavorites = [...state.favorites ]
            if (newFavorites.find((i) => i.guid === item.guid)) {
                newFavorites.splice(newFavorites.findIndex((i) => i.guid === item.guid), 1)
            }
            return {
                favorites: newFavorites
            }
        }),
    }),
    {
        name: 'app-storage', // unique name for this store
        storage: createJSONStorage(() => AsyncStorage),
    }
)
)