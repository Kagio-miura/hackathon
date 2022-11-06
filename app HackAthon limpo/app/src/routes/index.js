import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from '@expo/vector-icons';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome";
import Signin from "../pages/Signin";
import Register from "../pages/Register";

import Home from "../pages/Home";
import New from "../pages/New";
import Receitas from "../pages/Receitas";
import Profile from "../pages/Profile";
import Search from "../pages/Search";

import ButtonNew from "../components/ButtonNew";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopColor: 'transparent',
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                tabBarActiveTintColor: '#FFF',
            }}
        >
            <Tab.Screen name="Inicio" component={Home} options={{
                headerShown: false,
                tabBarIcon: ({ size, color }) => (
                    <Entypo name="home" size={size} color={color} />
                )
            }} />

            <Tab.Screen name="Procurar" component={Search} options={{
                headerShown: false,
                tabBarIcon: ({ size, color }) => (
                    <Feather name="search" size={size} color={color} />
                )
            }} />

            <Tab.Screen name="Novo" component={New} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({ focused, size, color }) => (
                    <ButtonNew size={size} color={color} focused={focused} />
                )
            }} />

            <Tab.Screen name="Receitas" component={Receitas} options={{
                headerShown: false,
                tabBarIcon: ({ size, color }) => (
                    <Entypo name="notification" size={size} color={color} />
                )
            }} />

            <Tab.Screen name="Perfil" component={Profile} options={{
                headerShown: false,
                tabBarIcon: ({ size, color }) => (
                    <Feather name="user" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    );
}

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="MyTabs"
                component={MyTabs}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}