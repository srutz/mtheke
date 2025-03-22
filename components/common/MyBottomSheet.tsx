
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ReactNode } from "react";
import { useColorScheme, View } from "react-native";

/* 
 * simple wrapper around BottomSheet
 */
export function MyBottomSheet({ children, height = 32 }: { children: ReactNode, height?: number }) {
    const colorScheme = useColorScheme();
    const darkMode = colorScheme === "dark";

    return (
        <>
            { /* placeholder view, nur um platz für den overlay zu reservieren */ }
            <View className={"h-[" + height + "]"}></View>
            <BottomSheet
                snapPoints={[height, "50%"]}
                backgroundStyle={{
                    backgroundColor: darkMode ? "#334155" : "#ffffff",
                }}
                handleIndicatorStyle={{
                    backgroundColor: darkMode ? "#cccccc" : "#333333",
                }}
                
            >
                <BottomSheetView className="flex-1 flex flex-col">
                    <View className="flex flex-col gap-2 mt-2">
                        {children}
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </>
    );
}

