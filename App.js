import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import Home from "./src/Home";
import Login from "./src/Login";
import Registration from "./src/Registration";
import CadastroUsuario from "./src/cadatrousuario";
import Dashboard from "./src/Dashboard";
import DenunciaCachorro from "./src/DenunciaCachorro";
import ChatScreen from "./src/ChatScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Oculta o cabeçalho em todas as telas
        }}
        initialRouteName="Home" // Define a tela inicial
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DenunciaCachorro" component={DenunciaCachorro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
