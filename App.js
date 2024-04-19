import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./src/screens/login";
import UnlogedScreen from "./src/screens/unlogedScreen";
import Register from "./src/screens/register";
import Home from "./src/screens/home";
import AnimalRegister from "./src/screens/registerAnimal";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UnlogedScreen" component={UnlogedScreen} />
      <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeStack} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Cadastro" component={Register} />
          <Drawer.Screen name="Cadastro do animal" component={AnimalRegister} />
          {/* Adicione mais telas aqui se necessário */}
        </Drawer.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
