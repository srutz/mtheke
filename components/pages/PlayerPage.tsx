import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "App";
import { DateRenderer } from 'components/common/DateRenderer';
import { DurationRenderer } from 'components/common/DurationRenderer';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { FeedItem } from "hooks/RssParser";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RouteProps = RouteProp<RootStackParamList, "Player">;

export function PlayerPage() {
    const route = useRoute<RouteProps>();
    const item = route.params.item as FeedItem;

    const videoUrl = item.enclosure.url
    console.log("Playing video", videoUrl)
    const player = useVideoPlayer(videoUrl, player => {
        player.loop = true;
        player.play();
    })

    const togglePlayPause = () => {
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
    };
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    return (
        <SafeAreaView className="flex-1 bg-slate-800">
            <ScrollView>
                <View className="flex-1 justify-center items-center p-4">
                    <View className="w-full h-96 bg-black rounded-lg overflow-hidden">
                        <VideoView style={{ width: "100%", height: "100%" }} player={player} allowsFullscreen allowsPictureInPicture />
                    </View>
                    <Text className="mt-4 text-white text-2xl font-bold mb-2">{item.title}</Text>
                    <View className="mb-4 flex flex-row gap-2 items-baseline">
                        <Text className="text-gray-200">{item.creator}</Text>
                        <DateRenderer className="text-base" date={item.pubDate} />
                    </View>
                    <Text className="text-gray-300 text-sm mb-6 text-center">{item.description}</Text>
                    <TouchableOpacity onPress={togglePlayPause} className="bg-slate-700 p-4 rounded-full">
                        <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="white" />
                    </TouchableOpacity>
                    <DurationRenderer className="mt-4 text-white text-lg" label="Dauer" seconds={parseInt(item.duration)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}