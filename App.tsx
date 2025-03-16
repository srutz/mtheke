
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PlayerPage } from 'components/pages/PlayerPage';
import { SearchPage } from 'components/pages/SearchPage';
import { useFonts } from 'expo-font';
import { FeedItem } from 'hooks/RssParser';
import './global.css';

console.log("Launching App.tsx")
const Stack = createNativeStackNavigator()
const client = new QueryClient() 

export type RootStackParamList = {
    Home: undefined,
    Player: { item: FeedItem },
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
                <Stack.Navigator
                    screenOptions={{
                        statusBarBackgroundColor: "#000000",
                        headerShown: false // Hide default header since we're using our custom StatusBar
                    }}>
                    <Stack.Screen name="Home" component={SearchPage} />
                    <Stack.Screen name="Player" component={PlayerPage} />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    )
}
