import { cn } from "hooks/Util";
import { Text } from "react-native";

export function DateRenderer({ date, className }: { date: string, className?: string }) {
    // dates are formatted like this: Thu, 13 Mar 2025 22:00:00 GMT
    const dateObj = new Date(date)
    return (
        <Text className={cn("text-gray-200 text-sm", className)}>
            {dateObj.toLocaleString()}
        </Text>
    )
}