import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./src/components/authProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Login from "./src/screens/login";
import UnlogedScreen from "./src/screens/unlogedScreen";
import Register from "./src/screens/register";
import Home from "./src/screens/home";
import AnimalRegister from "./src/screens/registerAnimal";
import Adopt from "./src/screens/adopt";
import AninmalDetails from "./src/screens/animalDetails";
import { NativeBaseProvider } from "native-base";
import { getAuth, signOut } from "firebase/auth";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import { Courgette_400Regular } from "@expo-google-fonts/courgette";
import SplashScreen from "expo-splash-screen";
import { useCallback } from "react";



function CustomDrawerContent(props) {
  
  const { isLoggedIn } = React.useContext(AuthContext);
  const { navigation } = props;

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth).finally(() => {
        navigation.navigate("UnlogedScreen")
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {!isLoggedIn ? (
        <DrawerItem label="Login" onPress={() => props.navigation.navigate('Login')} />
      ) : (
        <DrawerItem label="Logout" onPress={handleLogout} />
      )}
    </DrawerContentScrollView>
  );
}

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      navigation.navigate("HomeScreen");
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UnlogedScreen" component={UnlogedScreen} />
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Adopt" component={Adopt} />
      <Stack.Screen name="Login" component={Login} />

    </Stack.Navigator>
  );
};

export default function App({ navigation }) {
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
    Courgette_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Drawer = createDrawerNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerStyle: {
                backgroundColor: "#ffd358",
              },
              headerTintColor: "#434343",
            }}
          >
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="Cadastro" component={Register} />
            <Drawer.Screen
              name="Cadastro do animal"
              component={AnimalRegister}
            />
            <Drawer.Screen name="Detalhes do Animal" component={AninmalDetails} />
            {/* Adicione mais telas aqui se necessário */}
          </Drawer.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
