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
import CriarGrupo from '../screens/CriarGrupo/Index';
import Convite from '../screens/Convite';
import { Splash } from '../screens/Splash';


const Stack = createNativeStackNavigator();

type StackNavigation = {
    Home : undefined;
    Home2 : undefined;
    Login : undefined;
    // Details: { userId : number | undefined};
    Details: undefined;//{ GrupoId : string | undefined};
    Cadastro : undefined;
    FGpassword : undefined
    CriarGrupo : undefined
    Convite : undefined
    Splash : undefined
}

export type RootStackParamList = {
    Home: undefined;
    Home2: undefined;
    Login: undefined;
    Details: undefined;//{ userId: string};
    Cadastro : undefined;
    FGpassword : undefined
    CriarGrupo : undefined
    Convite : undefined
    Splash : undefined


};

export type StackTypes = NativeStackNavigationProp<StackNavigation>

export type StackNavigationProp<ScreenName extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, ScreenName>;
export type StackRouteProp<ScreenName extends keyof RootStackParamList> = RouteProp<RootStackParamList, ScreenName>;

export default function StackComponent(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen  name="Splash" component={Splash}   options={{headerShown: false }}  /> */}
                <Stack.Screen  name="Login" component={Login}   options={{headerShown: false }}  />
                <Stack.Screen  name="Home" component={Home} options={{headerShown: false }} />
                <Stack.Screen  name="Home2" component={Home2} options={{headerShown: false }} />
                <Stack.Screen  name="Details" component={Details} options={{headerShown: false }}  />
                <Stack.Screen  name="Cadastro" component={Cadastro}  options={{headerShown: false }} />
                <Stack.Screen  name="FGpassword" component={FGpassword} options={{headerShown: false }}   />
                <Stack.Screen  name="CriarGrupo" component={CriarGrupo} options={{headerShown: false }}   />
                <Stack.Screen  name="Convite" component={Convite} options={{headerShown: false }}   />




            </Stack.Navigator>
        </NavigationContainer>

    );
}