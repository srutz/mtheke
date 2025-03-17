import Ionicons from '@expo/vector-icons/Ionicons';
import { Linking, Text, TouchableOpacity, View } from "react-native";


export function ExternalLink({ url, label = url, force = true }: { url: string, force?: boolean, label?: string }) {
    const handlePress = async (url: string) => {

        if (force) {
            await Linking.openURL(url)
        } else {
            // Check if the link can be opened
            const supported = await Linking.canOpenURL(url)
            if (supported) {
                await Linking.openURL(url)
            } else {
                console.error(`Cannot open URL: ${url}`)
            }
        }
    }
    return (
        <TouchableOpacity onPress={() => handlePress(url)}>
            <View className="flex flex-row gap-2 items-center">
                <Ionicons name="browsers" size={12} color="#efefef" />
                <Text className="underline text-white" >{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

