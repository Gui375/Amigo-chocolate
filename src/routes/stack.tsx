import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Home2 from '../screens/Home2';
import Login from '../screens/Login';
import Details from '../screens/Details';
import { RouteProp } from '@react-navigation/native';
import Cadastro from '../screens/Cadastro';
import FGpassword from '../screens/FGpassword';

const Stack = createNativeStackNavigator();

type StackNavigation = {
    Home : undefined;
    Home2 : undefined;
    Login : undefined;
    Details: { userId : number | undefined};
    Cadastro : undefined;
    FGpassword : undefined
}

export type RootStackParamList = {
    Home: undefined;
    Home2: undefined;
    Login: undefined;
    Details: { userId: number};
    Cadastro : undefined;
    FGpassword : undefined
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>

export type StackNavigationProp<ScreenName extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, ScreenName>;
export type StackRouteProp<ScreenName extends keyof RootStackParamList> = RouteProp<RootStackParamList, ScreenName>;

export default function StackComponent(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen  name="Login" component={Login}   options={{headerShown: false }}  />
                <Stack.Screen  name="Home" component={Home} />
                <Stack.Screen  name="Home2" component={Home2} />
                <Stack.Screen  name="Details" component={Details}   />
                <Stack.Screen  name="Cadastro" component={Cadastro}   />
                <Stack.Screen  name="FGpassword" component={FGpassword}   />


            </Stack.Navigator>
        </NavigationContainer>

    );
}