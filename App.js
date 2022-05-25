import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./src/services/firebase";
import { MaterialIcons } from "@expo/vector-icons";

import Tracks from "./src/screen/Tracks";
import Login from "./src/screen/Login";
import Player from "./src/screen/Player";
import Playlist from "./src/screen/Playlist";
import PlaylistView from "./src/screen/PlaylistView";

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

const playlistIcon = (
  <MaterialIcons name="my-library-music" size={29} color={colors.primary} />
);

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
  }, [auth]);

  const commonStyles = {
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerRightContainerStyle: {
      paddingRight: 20,
    },
    headerTintColor: colors.primary,
    headerTitleAlign: "center",
  };

  const PlaylistNav = () => {
    return (
      <Stack.Navigator screenOptions={commonStyles}>
        <Stack.Screen
          name="PlaylistList"
          component={Playlist}
          options={{ title: "Playlist" }}
        />
        <Stack.Screen name="PlaylistView" component={PlaylistView} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {!user ? (
        <Tab.Navigator
          screenOptions={{
            ...commonStyles,
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
            name="Playlist"
            component={PlaylistNav}
            options={{
              headerShown: false,
              tabBarIcon: () => playlistIcon,
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
