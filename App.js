import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./src/services/firebase";
import { MaterialIcons } from "@expo/vector-icons";

import Tracks from "./src/screen/Tracks";
import Login from "./src/screen/Login";
import Player from "./src/screen/Player";
import Setting from "./src/screen/Settings";

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

const settingIcon = (
  <MaterialIcons name="settings" size={29} color={colors.primary} />
);

const commonsOptions = {
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerRightContainerStyle: {
    paddingRight: 20,
  },
  headerTintColor: colors.primary,
  headerTitleAlign: "center",
};

const SettingNav = () => {
  return (
    <Stack.Navigator screenOptions={{ ...commonsOptions }}>
      <Stack.Screen
        name="SettingHome"
        component={Setting}
        options={{ title: "Ajustes" }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
  }, [auth]);

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={{
            ...commonsOptions,
            tabBarStyle: {
              backgroundColor: colors.superficies,
              paddingBottom: "3%",
              height: "9%",
            },
            tabBarLabelStyle: {
              fontSize: size.h4,
            },
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
          <Tab.Screen
            name="Settings"
            component={SettingNav}
            options={{
              tabBarIcon: () => settingIcon,
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
