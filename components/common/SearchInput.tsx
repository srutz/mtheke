import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { TextInput, View } from "react-native";


export type SearchInputProps = {
    placeholder: string
    text: string
    onChangeText: (text: string) => void
}
export function SearchInput({ placeholder, text, onChangeText} : SearchInputProps) {
    const [searchText, setSearchText] = useState("")

    return (
        <View className="flex flex-row gap-1 items-center border border-gray-500 rounded-lg px-2 py-1 m-2">
            <Ionicons name="search" size={22} color="white" />
            <TextInput className="text-white" placeholder={placeholder}
                placeholderTextColor="#999999"
                value={text}
                clearButtonMode='always'
                onChangeText={onChangeText}
            ></TextInput>
        </View>
    )
}