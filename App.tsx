
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchPage } from 'components/pages/SearchPage';
import './global.css';

console.log("Launching App.tsx")
const Stack = createNativeStackNavigator()
const client = new QueryClient() 

export default function App() {
    return (
        <QueryClientProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false // Hide default header since we're using our custom StatusBar
                    }}>
                    <Stack.Screen name="Home" component={SearchPage} />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    )
}
