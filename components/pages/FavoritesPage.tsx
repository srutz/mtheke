import { Header } from "components/common/Header";
import { SearchableFeed } from "components/common/SearchableFeed";
import { SafeAreaView } from "react-native-safe-area-context";


export function FavoritesPage() {
    return (
        <SafeAreaView className="flex-1 bg-black">
            <Header title="Favorites" icon="film" color="text-blue-500"/>
            <SearchableFeed feedType="FAVORITES"/>
        </SafeAreaView>
    )
}