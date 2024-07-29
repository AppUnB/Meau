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
import { StyleProvider } from "native-base";
import { getAuth, signOut } from "firebase/auth";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Courgette_400Regular } from "@expo-google-fonts/courgette";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import UploadComp from "./src/screens/UploadImage";

function CustomDrawerContent(props) {
  const { isLoggedIn } = React.useContext(AuthContext);
  const { navigation } = props;

  CustomDrawerContent.propTypes = {
    navigation: PropTypes.object.isRequired,
  };


  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth).finally(() => {
        navigation.navigate("UnlogedScreen");
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {!isLoggedIn ? (
        <DrawerItem
          label="Login"
          onPress={() => props.navigation.navigate("Login")}
        />
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

const Drawer = createDrawerNavigator();

export default function App() {
  SplashScreen.preventAutoHideAsync();
  let [loaded, error] = useFonts({
    Roboto_400Regular, Roboto_500Medium, 
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
      <NavigationContainer>
        <StyleProvider>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
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
            <Drawer.Screen name="Upload de imagem" component={UploadComp} />
            {/* Adicione mais telas aqui se necessário */}
          </Drawer.Navigator>
        </StyleProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
