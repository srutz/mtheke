import Ionicons from '@expo/vector-icons/Ionicons';
import { cn } from 'hooks/Util';
import { Text, View } from "react-native";

export type HeaderProps = {
    title: string
    color?: string
    icon?: keyof typeof Ionicons.glyphMap
}

export function Header({ title, color = "text-green-500", icon }: HeaderProps) {
    const firstLetter = title[0]
    const remainingLetters = title.slice(1)
    return (
        <View className="mt-2 px-2 flex flex-row items-center">
            {icon && (
                <Ionicons name={icon} size={40} color="#efefef" />
            )}
            <Text className={cn("ml-4 mt-1 text-4xl font-bold", color)}>{firstLetter}</Text>
            <Text className="mt-1 text-4xl font-bold text-gray-100">{remainingLetters}</Text>
        </View>
    )
}

