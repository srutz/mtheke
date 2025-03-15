import { Text } from "react-native"

export function DurationRenderer({ seconds }: { seconds: number }) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    const formatNumber = (num: number) => num.toString().padStart(2, '0')

    return (
        <Text className="text-right text-gray-200 text-sm">
            {`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`}
        </Text>
    )
}