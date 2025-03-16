import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function AboutPage() {
    return (
        <SafeAreaView className="flex-1 bg-slate-800">
            <ScrollView>
                <View className="flex-1 justify-center items-center p-4">
                    <Text>About MTheke</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}