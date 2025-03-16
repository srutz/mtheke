import { SearchInput } from "components/common/SearchInput";
import { VideoRenderer } from "components/common/VideoRenderer";
import { useAppState } from "hooks/AppState";
import { useFeed } from "hooks/Feed";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export type FeedType = "WEB" | "FAVORITES"

export function SearchableFeed({ feedType }: { feedType: FeedType }) {

    const [searchText, setSearchText] = useState("")
    const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
    
    const appState = useAppState()
    const feedItems = useFeed({ 
        query: debouncedSearchText, 
    })
    const favoriteItems = appState.favorites
    const items = feedType === "WEB" ? feedItems : favoriteItems


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchText(searchText)
        }, 250)
        return () => clearTimeout(handler)
    }, [searchText])

    return (
        <>
            <SearchInput placeholder="Search videos" text={searchText} onChangeText={setSearchText} />
            <View className="h-1 grow bg-slate-900" >
                <FlatList data={items||[]}
                    renderItem={({ index, item }) => (<VideoRenderer key={index} feedType={feedType} item={item} />)}
                    keyExtractor={(item) => item.guid}
                />
            </View>
        </ >
    )
}