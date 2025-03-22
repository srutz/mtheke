import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "App";
import { DateRenderer } from 'components/common/DateRenderer';
import { DurationRenderer } from 'components/common/DurationRenderer';
import { ExternalLink } from 'components/common/ExternalLink';
import { MyBottomSheet } from 'components/common/MyBottomSheet';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import { useAppState } from 'hooks/AppState';
import { FeedItem } from "hooks/RssParser";
import { formatNumber } from 'hooks/Util';
import { useEffect, useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';

type RouteProps = RouteProp<RootStackParamList, "Player">;

export function PlayerPage() {
    const route = useRoute<RouteProps>();
    const item = route.params.item
    const feedType = route.params.feedType
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const videoUrl = item.enclosure.url
    console.log("Playing video", videoUrl)
    const appState = useAppState()
    const player = useVideoPlayer(videoUrl, player => {
        player.loop = false
        //player.play()
    })

    useEffect(() => {
        const i = setInterval(() => {
        }, 500)
        return () => clearInterval(i)
    }, [player])

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            // pause when not visible
            player.pause();
        })
        return unsubscribe;
    }, [navigation, player])

    const togglePlayPause = () => {
        if (isPlaying) {
            player.pause()
        } else {
            player.play()
        }
    };
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing })

    return (
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
            <View className="grow justify-center items-center p-4">
                <View className="w-full h-96 bg-black rounded-lg overflow-hidden">
                    <VideoView style={{ width: "100%", height: "100%" }} player={player} allowsFullscreen allowsPictureInPicture />
                </View>
                <Text className="mt-4 text-white text-xl font-bold mb-2">{item.title}</Text>
                <View className="mb-4 flex flex-row gap-2 items-baseline">
                    <Text className="text-gray-200">{item.creator}</Text>
                    <DateRenderer className="text-sm" date={item.pubDate} />
                    <DurationRenderer className="mt-4 text-white" label="Dauer" seconds={parseInt(item.duration)} />
                </View>
                <Text className="text-gray-300 text-sm mb-2 text-center">{item.description}</Text>
                <TouchableOpacity onPress={togglePlayPause} className="bg-slate-700 mt-4 p-4 rounded-full">
                    <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
                </TouchableOpacity>

                {false && (
                    <TimeDisplay player={player} />
                )}
                <View className="grow" />
                {!false && (
                <MyBottomSheet height={32}>
                <View className="self-stretch flex flex-col justify-center items-center gap-4">
                    <Text className="mb-8 text-white text-xl font-bold mb-2">Weitere Aktionen</Text>
                    <ExternalLink url={item.websiteUrl} label="Open Website" />
                    {feedType == "FAVORITES" ? (
                        <Button title="Remove favorite" color="red" onPress={() => {
                            const favoriteItem = deepCopyItem(item)
                            favoriteItem.currentTime = player.currentTime
                            appState.removeFavorite(favoriteItem)
                            navigation.navigate("Favorites")
                            Toast.show({
                                type: 'success',
                                text1: 'Removed from favorites',
                                text2: item.title + " was removed from favorites"
                            })
                        }} />
                    ) : (
                        <Button title="Add to favorites" onPress={() => {
                            const favoriteItem = deepCopyItem(item)
                            favoriteItem.currentTime = player.currentTime
                            appState.addFavorite(favoriteItem)
                            Toast.show({
                                type: 'success',
                                text1: 'Added to favorites',
                                text2: item.title + " was added to favorites"
                            })
                        }} />
                    )}
                </View>
            </MyBottomSheet>
            
                )}
            </View>
        </ScrollView>
    )
}

function deepCopyItem(item: FeedItem): FeedItem {
    return JSON.parse(JSON.stringify(item))
}

function TimeDisplay({ player }: { player: VideoPlayer }) {
    const [time, setTime] = useState(0)
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time / 60)
    const seconds = Math.round(time % 60)
    useEffect(() => {
        const i = setInterval(() => {
            setTime(player.currentTime)
        }, 500)
        return () => clearInterval(i)
    }, [player])
    return (<Text className="text-white">
        {`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`}
    </Text>)
}