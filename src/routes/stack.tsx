import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Home2 from '../screens/Home2';
import Login from '../screens/Login';
import Details from '../screens/Details';
import Cadastro from '../screens/Cadastro';
import FGpassword from '../screens/FGpassword';
import CriarGrupo from '../screens/CriarGrupo/Index';
import Convite from '../screens/Convite';
import { Splash } from '../screens/Splash';

const Stack = createNativeStackNavigator();

const StackComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Splash screen */}
        {/* <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} /> */}

        {/* Login screen */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

        {/* Main screens */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Home2" component={Home2} options={{ headerShown: false }} />

        {/* Details screen */}
        <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />

        {/* Cadastro screen */}
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />

        {/* Forgot Password screen */}
        <Stack.Screen name="FGpassword" component={FGpassword} options={{ headerShown: false }} />

        {/* CriarGrupo screen */}
        <Stack.Screen name="CriarGrupo" component={CriarGrupo} options={{ headerShown: false }} />

        {/* Convite screen */}
        <Stack.Screen name="Convite" component={Convite} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackComponent;
