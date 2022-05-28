import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./services/firebase";

import Tracks from "./screen/Tracks";
import Login from "./screen/Login";
import Player from "./screen/Player";
import PlaylistsView from "./screen/Playlists/PlaylistsView";
import Playlist from "./screen/Playlists/Playlist";
import Setting from "./screen/Settings/Setting";
import Account from "./screen/Settings/Account";

import colors from "./constants/colors";
import size from "./constants/size";
import icons from "./constants/icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator = ({
  songs,
  importSong,
  deleteSong,
  playlists,
  createNewPlaylist,
  addSongToPlaylist,
}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
  }, [auth]);

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

  const PlaylistNav = () => {
    return (
      <Stack.Navigator screenOptions={commonsOptions}>
        <Stack.Screen
          name="PlaylistsView"
          children={() => (
            <PlaylistsView
              playlists={playlists}
              createNewPlaylist={createNewPlaylist}
            />
          )}
          options={{ title: "Playlist" }}
        />
        <Stack.Screen
          name="PlaylistView"
          component={Playlist}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const SettingNav = () => {
    return (
      <Stack.Navigator screenOptions={{ ...commonsOptions }}>
        <Stack.Screen
          name="Home"
          component={Setting}
          options={{ title: "Ajustes" }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ title: "Cuenta" }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={{
            ...commonsOptions,
            tabBarStyle: {
              backgroundColor: colors.superficies,
              paddingTop: 5,
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
            children={() => (
              <Tracks
                songs={songs}
                importSong={importSong}
                deleteSong={deleteSong}
                addSongToPlaylist={addSongToPlaylist}
              />
            )}
            options={{
              title: "Pistas",
              tabBarIcon: () => icons.tracks,
            }}
          />
          <Tab.Screen
            name="Player"
            component={Player}
            options={{
              title: "Reproductor",
              tabBarIcon: () => icons.player,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Playlist"
            component={PlaylistNav}
            options={{
              headerShown: false,
              tabBarIcon: () => icons.playlist,
            }}
          />

          <Tab.Screen
            name="Settings"
            component={SettingNav}
            options={{
              tabBarIcon: () => icons.setting,
              title: "Ajustes",
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
};

export default Navigator;
