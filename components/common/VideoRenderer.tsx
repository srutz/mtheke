import { FeedItem } from "hooks/RssParser";
import { Text, View } from "react-native";
import { DateRenderer } from "./DateRenderer";
import { DurationRenderer } from "./DurationRenderer";

export function VideoRenderer({ item }: { item: FeedItem }) {
    return (
        <View className="flex flex-col gap-1 items-stretch bg-black rounded-lg border border-gray-700 p-2 m-2">
            <View className="mb-2 flex flex-row items-center gap-2">
                <Text className="text-gray-200 text-sm">{item.creator}</Text>
                <Text className="text-gray-200 text-sm">- {item.category}</Text>
            </View>
            <Text className="text-white font-bold">{item.title}</Text>
            <Text className="text-white text-gray-200">{item.description}</Text>
            <View className="mt-2 flex flex-row items-center justify-between">
                <DateRenderer date={item.pubDate} />
                <DurationRenderer seconds={parseInt(item.duration)} />
            </View>
        </View>
    )
}