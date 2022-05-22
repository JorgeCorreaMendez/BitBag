import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./src/services/firebase";
import { MaterialIcons } from "@expo/vector-icons";

import Tracks from "./src/screen/Tracks";
import Login from "./src/screen/Login";
import Player from "./src/screen/Player";

import colors from "./src/constants/colors";
import size from "./src/constants/size";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tracksIcon = (
  <MaterialIcons name="music-note" size={29} color={colors.primary} />
);

const playerIcon = (
  <MaterialIcons name="play-circle-outline" size={29} color={colors.primary} />
);

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
  }, [auth]);

  return (
    <NavigationContainer>
      {!user ? (
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            tabBarStyle: {
              backgroundColor: colors.superficies,
              paddingBottom: "3%",
              height: "9%",
            },
            tabBarLabelStyle: {
              fontSize: size.h4,
            },
            headerRightContainerStyle: {
              paddingRight: 20,
            },
            headerTintColor: colors.primary,
            headerTitleAlign: "center",
            tabBarActiveTintColor: colors.primary,
          }}
        >
          <Tab.Screen
            name="Tracks"
            component={Tracks}
            options={{
              title: "Pistas",
              tabBarIcon: () => tracksIcon,
            }}
          />
          <Tab.Screen
            name="Player"
            component={Player}
            options={{
              title: "Reproductor",
              tabBarIcon: () => playerIcon,
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
