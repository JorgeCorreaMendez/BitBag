import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./src/services/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import Login from "./src/screen/Login";
import Tracks from "./src/screen/Tracks";

import colors from "./src/constants/colors";
import size from "./src/constants/size";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TracksIcon = (
  <MaterialIcons name="music-note" size={29} color={colors.primary} />
);

const TabNavigator = (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.background,
      },
      tabBarStyle: {
        backgroundColor: colors.superficies,
        paddingBottom: 5,
        height: "9%",
      },
      tabBarLabelStyle: {
        fontSize: size.h4,
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
        headerBackVisible: false,
        tabBarIcon: () => TracksIcon,
      }}
    />
  </Tab.Navigator>
);

const StackNavigator = (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.primary,
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="Login"
      options={{ headerShown: false }}
      component={Login}
    />
  </Stack.Navigator>
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
      {user ? TabNavigator : StackNavigator}
    </NavigationContainer>
  );
}
