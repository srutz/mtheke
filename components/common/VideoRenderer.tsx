import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FeedItem } from "hooks/RssParser";
import { Pressable, Text, View } from "react-native";
import { DateRenderer } from "./DateRenderer";
import { DurationRenderer } from "./DurationRenderer";

export function VideoRenderer({ item }: { item: FeedItem }) {
    const navigation = useNavigation<NavigationProp<any>>()
    const handlePress = (item: FeedItem) => {
        navigation.navigate("Player", { item })
    }
    return (
        <Pressable onPress={() => handlePress(item)} >
            <View className="flex flex-col gap-1 items-stretch bg-slate-800 rounded-lg py-2 px-4 m-2">
                <View className="mb-2 flex flex-row items-center gap-2">
                    <Text className="text-gray-200 text-sm">{item.creator}</Text>
                    <Text className="text-gray-200 text-sm">- {item.category}</Text>
                </View>
                <Text className="text-white font-bold text-lg leading-[1.2]">{item.title}</Text>
                <Text className="text-white text-gray-200">{item.description}</Text>
                <View className="mt-2 flex flex-row items-center justify-between">
                    <DateRenderer date={item.pubDate} />
                    <DurationRenderer seconds={parseInt(item.duration)} />
                </View>
            </View>
        </Pressable>
    )
}