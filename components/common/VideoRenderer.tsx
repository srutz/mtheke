import { FeedItem } from "hooks/RssParser";
import { Text, View } from "react-native";

export function VideoRenderer({ item }: { item: FeedItem }) {
    return (
        <View className="flex flex-col items-stretch bg-black rounded-lg border border-gray-700 p-2 m-2">
            <Text className="text-white">{item.title}</Text>
            <Text className="text-white">{item.description}</Text>
        </View>
    )
}