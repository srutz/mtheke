import { cn } from "hooks/Util"
import { Text } from "react-native"

export function DurationRenderer({ seconds, label = "", className }: { seconds: number, label?: string, className?: string }) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    const formatNumber = (num: number) => num.toString().padStart(2, '0')

    return (
        <Text className={cn("text-right text-gray-200 text-sm", className)}>
            {label}{label && " "}
            {`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`}
        </Text>
    )
}