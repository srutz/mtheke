import { SearchInput } from "components/common/SearchInput";
import { VideoRenderer } from "components/common/VideoRenderer";
import { useFeed } from "hooks/Feed";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SearchPage() {
    const [searchText, setSearchText] = useState("")
    const feed = useFeed({ query: searchText})
    return (
        <SafeAreaView className="flex-1 bg-slate-800">
            <SearchInput placeholder="Search videos" text={searchText} onChangeText={setSearchText} />
            <View className="h-1 grow bg-slate-900">
                <FlatList data={feed?.items}
                    renderItem={({index,item}) => (<VideoRenderer key={index} item={item} />)}
                    keyExtractor={(item) => item.guid}
                    />

            </View>
        </SafeAreaView>
    )
}