import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/components/authProvider";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./src/screens/login";
import Register from "./src/screens/register";
import AnimalRegister from "./src/screens/registerAnimal";
import AnimalDetails from "./src/screens/animalDetails";
import { NativeBaseProvider } from "native-base";
import { Roboto_400Regular, useFonts } from "@expo-google-fonts/roboto";
import { Courgette_400Regular } from "@expo-google-fonts/courgette";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import CustomDrawerContent from "./src/components/drawerContent";
import ListarAnimais from "./src/screens/listaAnimais";
import Chat from "./src/screens/chat";
import NotificationProvider from "./src/components/NotificationProvider";
import ListarChats from "./src/screens/ListarChats";
import MyPets from "./src/screens/myPets";

const Drawer = createDrawerNavigator();

export default function App() {
  SplashScreen.preventAutoHideAsync();
  let [loaded, error] = useFonts({
    Roboto_400Regular,
    Courgette_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <NotificationProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <Drawer.Navigator
              initialRouteName="Login"
              drawerContent={(props) => <CustomDrawerContent {...props} />}
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#ffd358",
                },
                headerTintColor: "#434343",
              }}
            >
              <Drawer.Screen
                name="Login"
                component={Login}
                options={{ drawerLabel: "Login" }}
              />
              <Drawer.Screen
                name="Cadastro"
                component={Register}
                options={{ drawerLabel: "Cadastro" }}
              />
              <Drawer.Screen
                name="Lista de animais"
                component={ListarAnimais}
                options={{ drawerLabel: "Adotar (Lista de animais)" }}
              />
              <Drawer.Screen
                name="listarChats"
                component={ListarChats}
                options={{ drawerLabel: "Conversas" }}
              />
              <Drawer.Screen
                name="Meus animais"
                component={MyPets}
                options={{ drawerLabel: "Meus animais" }}
              />
              <Drawer.Screen
                name="Cadastro do animal"
                component={AnimalRegister}
                options={{ drawerLabel: "Botar animal para adoção" }}
              />
              <Drawer.Screen
                name="chat"
                component={Chat}
                options={{ drawerLabel: "" }}
              />
              <Drawer.Screen
                name="Detalhes do Animal"
                component={AnimalDetails}
                options={{ drawerLabel: "" }}
              />
            </Drawer.Navigator>
          </NativeBaseProvider>
        </NavigationContainer>
      </NotificationProvider>
    </AuthProvider>
  );
}
