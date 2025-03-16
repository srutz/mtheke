import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeedType } from 'components/common/SearchableFeed';
import { AboutPage } from 'components/pages/AboutPage'; // Import AboutPage
import { FavoritesPage } from 'components/pages/FavoritesPage';
import { PlayerPage } from 'components/pages/PlayerPage';
import { SearchPage } from 'components/pages/SearchPage';
import { useFonts } from 'expo-font';
import { FeedItem } from 'hooks/RssParser';
import './global.css';

console.log("Launching App.tsx")
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator(); // Create Tab Navigator
const client = new QueryClient() 

export type RootStackParamList = {
    Home: undefined,
    Player: { item: FeedItem, feedType: FeedType },
    Favorites: undefined,
    About: undefined
}

function HomeStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                statusBarBackgroundColor: "#000000",
                headerShown: false // Hide default header since we're using our custom StatusBar
            }}>
            <Stack.Screen name="Home" component={SearchPage} />
            <Stack.Screen name="Player" component={PlayerPage} />
        </Stack.Navigator>
    )
}

function FavoritesStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                statusBarBackgroundColor: "#000000",
                headerShown: false // Hide default header since we're using our custom StatusBar
            }}>
            <Stack.Screen name="Favorites" component={FavoritesPage} />
            <Stack.Screen name="Player" component={PlayerPage} />
        </Stack.Navigator>
    )
}


export default function App() {
    const [loaded, error] = useFonts({
        "Cantarell": require("./assets/fonts/Cantarell-VF.otf"),
    })
    if (!loaded && !error) {
        return null;
    }
    return (
        <QueryClientProvider client={client}>
            <NavigationContainer theme={DarkTheme} >
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={HomeStackNavigator} options={ { tabBarIcon: () => (
                        <Ionicons name="library" size={22} color="white" />)
                    }}/>
                    <Tab.Screen name="Favorites" component={FavoritesStackNavigator} options={ { tabBarIcon: () => (
                        <Ionicons name="film" size={22} color="white" />)
                    }}/>
                    <Tab.Screen name="About" component={AboutPage} options={ { tabBarIcon: () => (
                        <Ionicons name="cafe" size={22} color="white" />)
                    }}/>
                </Tab.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    )
}
