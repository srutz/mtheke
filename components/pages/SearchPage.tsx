import { SearchInput } from "components/common/SearchInput";
import { VideoRenderer } from "components/common/VideoRenderer";
import { useFeed } from "hooks/Feed";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SearchPage() {
    const [searchText, setSearchText] = useState("")
    const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
    const feed = useFeed({ query: debouncedSearchText });

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchText(searchText)
        }, 250)
        return () => clearTimeout(handler)
    }, [searchText])

    return (
        <SafeAreaView className="flex-1 bg-black">
            <SearchInput placeholder="Search videos" text={searchText} onChangeText={setSearchText} />
            <View className="h-1 grow bg-slate-900" >
                <FlatList data={feed?.items}s
                    renderItem={({index,item}) => (<VideoRenderer key={index} item={item} />)}
                    keyExtractor={(item) => item.guid}
                    />
            </View>
        </SafeAreaView>
    )
}