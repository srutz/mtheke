import { Text } from "react-native";

export function DateRenderer({ date }: { date: string }) {
    // dates are formatted like this: Thu, 13 Mar 2025 22:00:00 GMT
    const dateObj = new Date(date)
    return (
        <Text className="text-gray-200 text-sm">
            {dateObj.toLocaleString()}
        </Text>
    )
}