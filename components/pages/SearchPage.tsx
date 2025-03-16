import { Header } from "components/common/Header";
import { SearchableFeed } from "components/common/SearchableFeed";
import { SafeAreaView } from "react-native-safe-area-context";

export function SearchPage() {
    return (
        <SafeAreaView className="flex-1 bg-black">
            <Header title="Search Mediatheken" icon="library" />
            <SearchableFeed feedType="WEB"/>
        </SafeAreaView>
    )
}